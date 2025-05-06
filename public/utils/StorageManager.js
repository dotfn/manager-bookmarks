const StorageManager = {
  STORAGE_KEY: "preview_links",

  getAll() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  getAllItems() {
    const collection = StorageManager.getAll();
    return Object.values(collection);
  },

  saveItem(item) {
    const collection = StorageManager.getAll();
    const exists = Object.values(collection).some(
      (existing) => existing.url === item.url
    );
    if (exists) {
      throw new Error("Este enlace ya fue guardado.");
    }

    collection[item.id] = item;
    localStorage.setItem(
      StorageManager.STORAGE_KEY,
      JSON.stringify(collection)
    );
    return item;
  },

  hasItem(url) {
    const collection = StorageManager.getAll();
    return Object.values(collection).some((item) => item.url === url);
  },

  removeItem(id) {
    const collection = StorageManager.getAll();
    if (collection[id]) {
      delete collection[id];
      localStorage.setItem(
        StorageManager.STORAGE_KEY,
        JSON.stringify(collection)
      );
      return true;
    }
    return false;
  },

  search(query) {
    const collection = StorageManager.getAll();
    const results = {};

    Object.entries(collection).forEach(([id, item]) => {
      if (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.publisher.toLowerCase().includes(query.toLowerCase())
      ) {
        results[id] = item;
      }
    });

    return results;
  },

  clear() {
    localStorage.removeItem(StorageManager.STORAGE_KEY);
  },
};

export default StorageManager;
