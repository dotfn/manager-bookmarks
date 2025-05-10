// LinkCard.jsx
import { useEffect, useState } from "react";
import LinkNoteSection from "./LinkNoteSection"; // Importamos el nuevo componente

export default function LinkCard({
  link,
  onRemove,
  onToggleFavorite,
  onUpdateNote,
}) {
  const [isFavorite, setIsFavorite] = useState(link.favorite || false);

  useEffect(() => {
    setIsFavorite(link.favorite || false);
  }, [link.favorite]);

  const handleToggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (typeof onToggleFavorite === "function") {
      onToggleFavorite(link.id, newFavoriteStatus);
    }
  };
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
    <>
      <article className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
        <div className="md:flex">
          <figure className="md:w-1/3 relative">
            <img
              src={
                link.image ||
                "https://translate.google.com/website?sl=en&tl=es&hl=es&client=srp&u=https://media.npr.org/assets/img/2023/01/14/this-is-fine_custom-b7c50c845a78f5d7716475a92016d52655ba3115.jpg?s%3D800%26c%3D85%26f%3Dwebp"
              }
              alt={`Imagen representativa de ${link.title}`}
              className="object-cover w-full h-48 md:h-full"
              loading="lazy"
            />
            <button
              onClick={handleToggleFavorite}
              className="absolute hover:cursor-pointer top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label={
                isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
              }
            >
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500 hover:text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              )}
            </button>
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
            <LinkNoteSection
              linkId={link.id}
              initialNote={link.note}
              onNoteUpdate={onUpdateNote}
            />

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
    </>
  );
}
