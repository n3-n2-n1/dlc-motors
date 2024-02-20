import { useState } from "react";

import { useSearchContext } from "../../contexts/SearchContext.tsx";
import SearchIcon from "../icon/SearchIcon/SearchIcon.tsx";
import { exportToExcel } from "../../utils/downloadProducts.tsx";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths.ts";
import { handleAddMassive } from "../../utils/Handlers/Handlers.tsx";

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

  // const handleEditMassive = () => {
  //   // Lógica para la edición masiva
  //   console.log("Editar masivamente");
  // };

  const handleDownload = () => {
    exportToExcel();
  };

  // const handleAddMassiveData = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   handleAddMassive(event as any);
  // };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/${searchTerm}`
      );

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const { payload } = await response.json();
      setSearchResults(payload);
      setCurrentPage(1);
      const totalPages = Math.ceil(payload.length / itemsPerPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    }
  };

  return (
    <div className="w-full flex justify-between p-2 mb-3">
      {/* AL LADO DE FILTER */}
      <div className="flex items-center gap-3 mr-4">
        {/* Botón para descarga */}
        <button
          onClick={handleDownload}
          className="bg-blue-700 inline-flex font-bold items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-100 dark:text-gray-400 leading-none hover:text-gray-200"
        >
          Descargar
        </button>
      </div>

      <div className="flex items-center gap-3 mr-4">
        {/* Botón para descarga */}

        <Link to={paths.scanner}>
        <button
          
          className="bg-blue-700 inline-flex font-bold items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-100 dark:text-gray-400 leading-none hover:text-gray-200"
          >
          Escanear QR
        </button>
          </Link>
      </div>

      {/* DEL OTRO COSTADO */}
      <div className="flex items-center gap-3 ">
        {/* Botón para agregar uno solo */}
        <Link to={paths.addProduct}>
          <button className="px-4 inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-white dark:border-gray-800 leading-none py-0 gap-3 bg-blue-700 hover:text-gray-100 hover:bg-blue-800">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_4_3946"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="16"
              >
                <rect width="16" height="16" fill="#fefefe" />
              </mask>
              <g mask="url(#mask0_4_3946)">
                <path
                  d="M8.00016 12.6667C7.81127 12.6667 7.65305 12.6027 7.5255 12.4747C7.3975 12.3472 7.3335 12.1889 7.3335 12V8.66671H4.00016C3.81127 8.66671 3.65283 8.60271 3.52483 8.47471C3.39727 8.34715 3.3335 8.18893 3.3335 8.00004C3.3335 7.81115 3.39727 7.65271 3.52483 7.52471C3.65283 7.39715 3.81127 7.33337 4.00016 7.33337H7.3335V4.00004C7.3335 3.81115 7.3975 3.65271 7.5255 3.52471C7.65305 3.39715 7.81127 3.33337 8.00016 3.33337C8.18905 3.33337 8.3475 3.39715 8.4755 3.52471C8.60305 3.65271 8.66683 3.81115 8.66683 4.00004V7.33337H12.0002C12.1891 7.33337 12.3473 7.39715 12.4748 7.52471C12.6028 7.65271 12.6668 7.81115 12.6668 8.00004C12.6668 8.18893 12.6028 8.34715 12.4748 8.47471C12.3473 8.60271 12.1891 8.66671 12.0002 8.66671H8.66683V12C8.66683 12.1889 8.60305 12.3472 8.4755 12.4747C8.3475 12.6027 8.18905 12.6667 8.00016 12.6667Z"
                  fill="#fefefe"
                />
              </g>
            </svg>
            Agregar producto
          </button>
        </Link>

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
            className="ml-2 bg-blue-700 text-white px-4 py-1 rounded-3xl hover:bg-blue-900"
          >
            <SearchIcon color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actions;
