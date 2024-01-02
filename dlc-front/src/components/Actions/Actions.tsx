import { useState } from "react";

import { useSearchContext } from "../../contexts/SearchContext.tsx";
import SearchIcon from "../icon/SearchIcon/SearchIcon.tsx";

// Habría que dejar esta interface en un lugar general
export interface IProduct {
  Codigo: string;
  Producto: string;
  Rubro: string;
  CodBarras: string;
  Precio: string;
  Stock: string;
}


const Actions = () => {
  const { setSearchResults, setCurrentPage, setTotalPages, itemsPerPage } =
    useSearchContext();

  const [searchTerm, setSearchTerm] = useState("");

  const handleEditMassive = () => {
    // Lógica para la edición masiva
    console.log("Editar masivamente");
  };

  const handleDownload = () => {
    // Lógica para la descarga
    console.log("Descargar");
  };

  const handleAddOne = () => {
    // Lógica para agregar uno solo
    console.log("Agregar uno solo");
  };

  const handleAddMassive = () => {
    // Lógica para agregar masivamente
    console.log("Agregar masivamente");
  };

  const handleSearch = async () => {
    try {
      // Realiza la solicitud a la API para obtener la lista de productos
      const response = await fetch(`/productos?search=${searchTerm}`);
      const {data} = await response.json();

      setSearchResults(data); // Establece los resultados de búsqueda en el contexto
      setCurrentPage(1);
      const totalPages = Math.ceil(data.length / itemsPerPage);
      setTotalPages(totalPages);
    } catch (error) {
      
      console.error("Error fetching products:", error);
      // Puedes agregar lógica para manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
      <div className="w-full flex justify-between p-2 mb-3">
      {/* AL LADO DE FILTER */}
      <div className="flex items-center gap-3">
        {/* Botón para edición masiva */}
        <button
          onClick={handleEditMassive}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-100 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
        >
          Editar varios
        </button>
        {/* Botón para descarga */}
        <button
          onClick={handleDownload}
          className="bg-slate-800 inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-100 dark:text-gray-400 border-gray-800 border border-gray-200 leading-none py-0"
        >
          Descargar
        </button>
      </div>

      {/* DEL OTRO COSTADO */}
      <div className="flex items-center gap-3">
        {/* Botón para agregar uno solo */}
        <button
          onClick={handleAddOne}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0 gap-3"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_4_3946"  maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
            <rect width="16" height="16" fill="#fefefe"/>
            </mask>
            <g mask="url(#mask0_4_3946)">
            <path d="M8.00016 12.6667C7.81127 12.6667 7.65305 12.6027 7.5255 12.4747C7.3975 12.3472 7.3335 12.1889 7.3335 12V8.66671H4.00016C3.81127 8.66671 3.65283 8.60271 3.52483 8.47471C3.39727 8.34715 3.3335 8.18893 3.3335 8.00004C3.3335 7.81115 3.39727 7.65271 3.52483 7.52471C3.65283 7.39715 3.81127 7.33337 4.00016 7.33337H7.3335V4.00004C7.3335 3.81115 7.3975 3.65271 7.5255 3.52471C7.65305 3.39715 7.81127 3.33337 8.00016 3.33337C8.18905 3.33337 8.3475 3.39715 8.4755 3.52471C8.60305 3.65271 8.66683 3.81115 8.66683 4.00004V7.33337H12.0002C12.1891 7.33337 12.3473 7.39715 12.4748 7.52471C12.6028 7.65271 12.6668 7.81115 12.6668 8.00004C12.6668 8.18893 12.6028 8.34715 12.4748 8.47471C12.3473 8.60271 12.1891 8.66671 12.0002 8.66671H8.66683V12C8.66683 12.1889 8.60305 12.3472 8.4755 12.4747C8.3475 12.6027 8.18905 12.6667 8.00016 12.6667Z" fill="#fefefe"/>
            </g>
            </svg>

          Agregar producto
        </button>
        {/* Botón para agregar masiva */}
        <button
          onClick={handleAddMassive}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0 gap-3"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_4_3967" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect width="16" height="16" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_4_3967)">
          <path d="M8.00016 11.3334C8.18905 11.3334 8.3475 11.2694 8.4755 11.1414C8.60305 11.0138 8.66683 10.8556 8.66683 10.6667V8.66671H10.6835C10.8724 8.66671 11.0279 8.60271 11.1502 8.47471C11.2724 8.34715 11.3335 8.18893 11.3335 8.00004C11.3335 7.81115 11.2695 7.65271 11.1415 7.52471C11.0139 7.39715 10.8557 7.33337 10.6668 7.33337H8.66683V5.31671C8.66683 5.12782 8.60305 4.97226 8.4755 4.85004C8.3475 4.72782 8.18905 4.66671 8.00016 4.66671C7.81127 4.66671 7.65305 4.73048 7.5255 4.85804C7.3975 4.98604 7.3335 5.14448 7.3335 5.33337V7.33337H5.31683C5.12794 7.33337 4.97238 7.39715 4.85016 7.52471C4.72794 7.65271 4.66683 7.81115 4.66683 8.00004C4.66683 8.18893 4.73061 8.34715 4.85816 8.47471C4.98616 8.60271 5.14461 8.66671 5.3335 8.66671H7.3335V10.6834C7.3335 10.8723 7.3975 11.0278 7.5255 11.15C7.65305 11.2723 7.81127 11.3334 8.00016 11.3334ZM8.00016 14.6667C7.07794 14.6667 6.21127 14.4916 5.40016 14.1414C4.58905 13.7916 3.8835 13.3167 3.2835 12.7167C2.6835 12.1167 2.20861 11.4112 1.85883 10.6C1.50861 9.78893 1.3335 8.92226 1.3335 8.00004C1.3335 7.07782 1.50861 6.21115 1.85883 5.40004C2.20861 4.58893 2.6835 3.88337 3.2835 3.28337C3.8835 2.68337 4.58905 2.20826 5.40016 1.85804C6.21127 1.50826 7.07794 1.33337 8.00016 1.33337C8.92238 1.33337 9.78905 1.50826 10.6002 1.85804C11.4113 2.20826 12.1168 2.68337 12.7168 3.28337C13.3168 3.88337 13.7917 4.58893 14.1415 5.40004C14.4917 6.21115 14.6668 7.07782 14.6668 8.00004C14.6668 8.92226 14.4917 9.78893 14.1415 10.6C13.7917 11.4112 13.3168 12.1167 12.7168 12.7167C12.1168 13.3167 11.4113 13.7916 10.6002 14.1414C9.78905 14.4916 8.92238 14.6667 8.00016 14.6667ZM8.00016 13.3334C9.47794 13.3334 10.7364 12.814 11.7755 11.7754C12.8142 10.7363 13.3335 9.47782 13.3335 8.00004C13.3335 6.52226 12.8142 5.26382 11.7755 4.22471C10.7364 3.18604 9.47794 2.66671 8.00016 2.66671C6.52238 2.66671 5.26416 3.18604 4.2255 4.22471C3.18638 5.26382 2.66683 6.52226 2.66683 8.00004C2.66683 9.47782 3.18638 10.7363 4.2255 11.7754C5.26416 12.814 6.52238 13.3334 8.00016 13.3334Z" fill="#fefefe"/>
          </g>
          </svg>

          Agregar varios
        </button>
        <div className="flex items-center py-2">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-3xl w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
            id="inline-search"
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-[#A9DFD8] text-white px-4 py-1 rounded-3xl"
          >
            <SearchIcon color="black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actions;
