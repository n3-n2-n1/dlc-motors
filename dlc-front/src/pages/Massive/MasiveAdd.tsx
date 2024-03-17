import React, { useState } from "react";
import Papa from "papaparse";
import { createMultipleProducts } from "../../utils/Handlers/Handlers";
import Navbar from "../../components/Navbar/Navbar";

const MassiveAdd = () => {
  const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
        console.log('Datos parseados:', result.data);
        createMultipleProducts(result.data); // Llama a la función con los datos parseados directamente
      },
    });
  };
  

  return (
<div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block p-6">
  <div className="flex flex-col space-y-6 md:space-y-0 justify-between">
    <Navbar title={"Agregar masivamente"} subtitle={"Agregá productos por .CSV, Excel y más."} />
    <section className="pt-12">
      <label
        className="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-6 text-sm transition hover:border-gray-400 dark:hover:border-gray-500 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
        tabIndex="0"
      >
        <span htmlFor="photo-dropbox" className="flex items-center space-x-2">
          {/* SVG icon */}
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Arrastra tus archivos
            <span className="text-blue-600 underline"> buscar aquí</span>
          </span>
        </span>
        <input
          className="block w-full text-sm text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none"
          id="file_input"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </label>
    </section>
  </div>
</div>

  );
};

export default MassiveAdd;
