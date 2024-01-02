import { useState } from "react";

import { useSearchContext } from "../../contexts/SearchContext.tsx";
import SearchIcon from "../icon/SearchIcon/SearchIcon.tsx";

// Habría que dejar esta interface en un lugar general

//ESTO NO ES LO QUE PARECE HAY QUE REFACTORIZAR ESTO YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ACA NO VA EL IPRODUCT DESDE YA AVISO
export interface IProduct {
  Codigo: string;
  Producto: string;
  Rubro: string;
  CodBarras: string;
  Precio: string;
  Stock: string;
}

const UserActions = () => {
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
      const { data } = await response.json();

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
      <div className="flex items-center gap-3"></div>

      {/* DEL OTRO COSTADO */}
      <div className="flex items-center gap-3">
        {/* Botón para edición masiva */}
        <button
          onClick={handleEditMassive}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-100 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
        >
          Editar
        </button>
        {/* Botón para agregar uno solo */}
        <button
          onClick={handleAddOne}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0 gap-3"
        >
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
          Agregar usuario
        </button>
      </div>
    </div>
  );
};

export default UserActions;
