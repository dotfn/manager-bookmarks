// NoteModal.jsx
import { useEffect, useRef, useState } from "react";

export function NoteModal({ isOpen, onClose, initialNote, onSave }) {
  const [noteText, setNoteText] = useState(initialNote || "");
  const modalRef = useRef(null);

  // Asegurarse de que noteText se actualice si initialNote cambia entre renders
  useEffect(() => {
    if (isOpen) {
      setNoteText(initialNote || "");
    }
  }, [initialNote, isOpen]);

  // Manejar clics fuera del modal para cerrar
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Añadir event listener para la tecla Escape
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col"
      >
        <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {initialNote ? "Editar nota" : "Agregar nota"}
          </h3>
        </header>

        <div className="p-6 flex-grow overflow-auto">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full p-3 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Escriba su nota aquí..."
            rows="6"
            autoFocus
          />
        </div>

        <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSave(noteText);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Guardar
          </button>
        </footer>
      </div>
    </div>
  );
}
