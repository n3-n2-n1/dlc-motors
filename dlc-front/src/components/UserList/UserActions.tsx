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
      </div>
    </div>
  );
};

export default UserActions;
