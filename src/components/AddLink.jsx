import { useState } from "react";
import LinkPreviewService from "../utils/LinkPreviewServices.js";

const LinkForm = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    setLoading(true); // Iniciar carga

    try {
      const item = await LinkPreviewService.fetchAndStore(trimmedUrl);
      setUrl("");
      document.dispatchEvent(new CustomEvent("linkAdded", { detail: item }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  return (
    <section className="p-4 mx-auto bg-white rounded-lg shadow-md">
      <form id="urlForm" className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="urlInput"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ingresá una URL
          </label>
          <input
            type="url"
            id="urlInput"
            name="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="https://ejemplo.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          id="previewButton"
          className={`w-full text-white ${
            loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          disabled={loading} // Deshabilitar el botón mientras se carga
        >
          {loading ? "Cargando..." : "Agregar enlace"}
        </button>
        {loading && (
          <div className="flex justify-center mt-2">
            <div className="loader"></div>{" "}
            {/* Aquí puedes agregar un spinner */}
          </div>
        )}
      </form>
    </section>
  );
};

export default LinkForm;
