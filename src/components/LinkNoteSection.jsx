// LinkNoteSection.jsx
import { useEffect, useState } from "react";
import { NoteModal } from "./NoteModal"; // Asumiendo que NoteModal.jsx está en el mismo directorio

export default function LinkNoteSection({ linkId, initialNote, onNoteUpdate }) {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(initialNote || "");
  const [hasNote, setHasNote] = useState(Boolean(initialNote));

  useEffect(() => {
    setCurrentNote(initialNote || "");
    setHasNote(Boolean(initialNote));
  }, [initialNote]);

  const handleSaveNote = (noteText) => {
    setCurrentNote(noteText);
    setHasNote(Boolean(noteText));
    if (typeof onNoteUpdate === "function") {
      onNoteUpdate(linkId, noteText); // Llama a la función del padre para actualizar globalmente
    }
    setIsNoteModalOpen(false); // Cierra el modal después de guardar
  };

  return (
    <>
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        initialNote={currentNote}
        onSave={handleSaveNote}
      />

      <div className="mb-4">
        {hasNote && (
          <div className="p-2 bg-yellow-50 dark:bg-gray-700 rounded-md mb-2 border-l-4 border-yellow-400 dark:border-yellow-600">
            <div className="flex justify-between items-start">
              <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-1">
                Nota:
              </p>
              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                aria-label="Editar nota"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {currentNote}
            </p>
          </div>
        )}

        {!hasNote && (
          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 transition-colors"
            aria-label="Añadir nota"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Añadir nota
          </button>
        )}
      </div>
    </>
  );
}
