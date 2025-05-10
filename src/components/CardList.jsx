// CardList.jsx
import { useEffect, useState } from "react";
import StorageManager from "../utils/StorageManager.js"; // Confirmar ruta
import LinkCard from "./LinkCard";

export default function CardList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const loadLinks = () => {
      try {
        const items = StorageManager.getAllItems
          ? StorageManager.getAllItems()
          : StorageManager.getItems();
        if (items && items.length > 0) {
          items.sort((a, b) => new Date(b.date) - new Date(a.date));
          setLinks(items);
        } else {
          setLinks([]);
        }
      } catch (error) {
        console.error("Error al cargar enlaces:", error);
        setLinks([]);
      }
    };

    loadLinks();

    const handleLinkAdded = (event) => {
      const newLink = event.detail;
      const linkWithNote = { ...newLink, note: newLink.note || "" };
      setLinks((prevLinks) =>
        [linkWithNote, ...prevLinks].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
    };

    document.addEventListener("linkAdded", handleLinkAdded);

    return () => {
      document.removeEventListener("linkAdded", handleLinkAdded);
    };
  }, []);

  const handleRemove = (id) => {
    try {
      StorageManager.removeItem(id);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    } catch (error) {
      console.error("Error al eliminar enlace:", error);
    }
  };

  const handleUpdateFavorite = (id, isFavorite) => {
    try {
      StorageManager.updateItem(id, { favorite: isFavorite });
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, favorite: isFavorite } : link
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de favorito:", error);
    }
  };

  const handleToggleFavorite = (id) => {
    const link = links.find((link) => link.id === id);
    if (link) {
      const newFavoriteStatus = !link.favorite;
      handleUpdateFavorite(id, newFavoriteStatus);
    }
  };

  const handleUpdateNote = (id, noteText) => {
    try {
      // Asumo que tu StorageManager tiene un método updateItem
      const updatedLink = StorageManager.updateItem(id, { note: noteText });
      if (updatedLink) {
        // Si updateItem devuelve el ítem actualizado
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.id === id ? { ...link, note: noteText } : link
          )
        );
      } else {
        // Si updateItem no devuelve el ítem, actualizamos el estado directamente
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.id === id ? { ...link, note: noteText } : link
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link} // 'link' ya debería tener la propiedad 'note' de StorageManager
          onToggleFavorite={() => handleToggleFavorite(link.id)}
          onRemove={() => handleRemove(link.id)} // Mantenemos la función anónima
          onUpdateNote={handleUpdateNote} // <--- PASAR LA NUEVA FUNCIÓN DE ACTUALIZAR NOTA
        />
      ))}
    </div>
  );
}
