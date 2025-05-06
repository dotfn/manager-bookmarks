import { useEffect, useState } from "react";

export default function CardList() {
  // Estado para almacenar todos los enlaces
  const [links, setLinks] = useState([]);

  // Efecto para cargar enlaces iniciales del localStorage
  useEffect(() => {
    // Función para cargar enlaces desde localStorage
    const loadLinks = () => {
      try {
        const storageKey = "preview_links";
        const data = localStorage.getItem(storageKey);
        if (data) {
          const collection = JSON.parse(data);
          const items = Object.values(collection);
          if (items.length > 0) {
            setLinks(items);
          }
        }
      } catch (error) {
        console.error("Error al cargar enlaces:", error);
      }
    };

    // Cargar enlaces al montar el componente
    loadLinks();

    // Configurar el listener para el evento linkAdded
    const handleLinkAdded = (event) => {
      const newLink = event.detail;
      setLinks((prevLinks) => [newLink, ...prevLinks]);
    };

    // Añadir el event listener
    document.addEventListener("linkAdded", handleLinkAdded);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("linkAdded", handleLinkAdded);
    };
  }, []);

  // Función para eliminar un enlace
  const handleRemove = (id) => {
    try {
      const storageKey = "preview_links";
      const data = localStorage.getItem(storageKey);
      if (data) {
        const collection = JSON.parse(data);
        if (collection[id]) {
          delete collection[id];
          localStorage.setItem(storageKey, JSON.stringify(collection));
          setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
        }
      }
    } catch (error) {
      console.error("Error al eliminar enlace:", error);
    }
  };

  // Renderizar cada tarjeta de enlace
  return (
    <div className="mt-8 space-y-6">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onRemove={() => handleRemove(link.id)}
        />
      ))}
    </div>
  );
}

// Componente para una sola tarjeta de enlace
function LinkCard({ link, onRemove }) {
  const formattedDate = new Date(link.date).toLocaleDateString(
    link.lang || "es",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const hostname = new URL(link.url).hostname;

  return (
    <article className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
      <div className="md:flex">
        <figure className="md:w-1/3">
          <img
            src={
              link.image ||
              "https://translate.google.com/website?sl=en&tl=es&hl=es&client=srp&u=https://media.npr.org/assets/img/2023/01/14/this-is-fine_custom-b7c50c845a78f5d7716475a92016d52655ba3115.jpg?s%3D800%26c%3D85%26f%3Dwebp"
            }
            alt={`Imagen representativa de ${link.title}`}
            className="object-cover w-full h-48 md:h-full"
            loading="lazy"
          />
        </figure>

        <section className="p-5 flex flex-col justify-between md:w-2/3">
          <header className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={link.logo || ""}
                alt="Logo del sitio"
                className="w-6 h-6 rounded"
                loading="lazy"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {link.publisher || "Desconocido"}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug">
              {link.title}
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {formattedDate}
            </p>
          </header>

          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {link.description}
          </p>

          <footer className="flex items-center justify-between">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {hostname}
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800 dark:focus:ring-yellow-700"
              >
                Editar
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 dark:focus:ring-red-700"
                onClick={onRemove}
              >
                Eliminar
              </button>
            </div>
          </footer>
        </section>
      </div>
    </article>
  );
}
