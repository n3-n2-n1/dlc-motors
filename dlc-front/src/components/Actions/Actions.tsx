import { useState } from "react";

import { useSearchContext } from "../../contexts/SearchContext.tsx";

import jsonData from "../../mocks/mocks.json";

// Habría que dejar esta interface en un lugar general
export interface IProduct {
  Codigo: string;
  Producto: string;
  Rubro: string;
  CodBarras: string;
  Precio: string;
  Stock: string;
}

interface JsonData {
  products: IProduct[];
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

  const handleSearch = () => {
    // Convierte jsonData a tipo JsonData
    const typedJsonData: JsonData = jsonData;

    // Lógica para buscar en el JSON
    const result = typedJsonData.products.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults(result);
    setCurrentPage(1);
    const totalPages = Math.ceil(result.length / itemsPerPage);
    setTotalPages(totalPages);
  };

  return (
      <div className="w-full flex justify-between p-4 mb-3">
      {/* AL LADO DE FILTER */}
      <div className="flex items-center gap-3">
        {/* Botón para edición masiva */}
        <button
          onClick={handleEditMassive}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
        >
          Editar masivamente
        </button>
        {/* Botón para descarga */}
        <button
          onClick={handleDownload}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
        >
          Descargar
        </button>
      </div>

      {/* DEL OTRO COSTADO */}
      <div className="flex items-center gap-3">
        {/* Botón para agregar uno solo */}
        <button
          onClick={handleAddOne}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
        >
          Agregar Producto
        </button>
        {/* Botón para agregar masiva */}
        <button
          onClick={handleAddMassive}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
        >
          Agregar varios Productos
        </button>
        <div className="flex items-center py-2">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-search"
            type="text"
            placeholder="Search"
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
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actions;
