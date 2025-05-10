import StorageManager from "./StorageManager.js";

const API_BASE = "https://api.microlink.io/?url=";

const LinkPreviewService = {
  async fetchAndStore(url) {
    try {
      const res = await fetch(`${API_BASE}${encodeURIComponent(url)}`);
      const json = await res.json();

      if (json.status !== "success" || !json.data) {
        throw new Error("No se pudo obtener una respuesta válida de la API");
      }

      const data = json.data;

      // Preparamos el objeto a guardar
      const item = {
        id: Date.now().toString(), // id único
        lang: data.lang || "es",
        title: data.title || "Sin título",
        publisher: data.publisher || "Desconocido",
        image: data.image?.url || "",
        date: data.date || new Date().toISOString(),
        url: data.url || url,
        description: data.description || "",
        logo: data.logo?.url || "",
        favorite: false,
        note: "",
      };

      // Guardamos usando el StorageManager
      return StorageManager.saveItem(item);
    } catch (error) {
      console.error("Error al obtener y guardar el enlace:", error);
      throw error;
    }
  },
};

export default LinkPreviewService;
