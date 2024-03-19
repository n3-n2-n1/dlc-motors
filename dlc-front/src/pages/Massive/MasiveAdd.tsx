import React, { useState } from "react";
import Papa from "papaparse";
import { createMultipleProducts } from "../../utils/Handlers/Handlers";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import Dashcards from "../../components/Dashcards/Dashcards";

const MassiveAdd = () => {
  const [data, setData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false); // Nuevo estado para manejar la previsualización

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIsUploading(true);
    setIsPreviewing(true); // Establecer que se está previsualizando
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
        setIsUploading(false);
      },
    });
  };

  const handleCancel = () => {
    setData([]); // Vaciar los datos
    setIsPreviewing(false); // Ya no estamos previsualizando
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      await createMultipleProducts(data);
      toast.success("Productos agregados exitosamente");
    } catch (error) {
      toast.error("Error al agregar productos");
      console.error("Error en la solicitud:", error);
    }
    setIsUploading(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block p-6 transition-all select-none">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between">
        <Navbar
          title={"Agregar masivamente"}
          subtitle={"Agregá productos por .CSV, Excel y más."}
        />
        <section className="pt-12">
          <label
            className="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-6 text-sm transition hover:border-gray-400 dark:hover:border-gray-500 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
            tabIndex="0"
          >
            <span
              htmlFor="photo-dropbox"
              className="flex items-center space-x-2"
            >
              {/* SVG icon */}
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Arrastra tus archivos
                <span className="text-blue-600 underline p-1">
                  o buscar aquí
                </span>
              </span>
            </span>
            <input
              disabled={isUploading}
              className=" p-4 block w-full text-sm text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none pt-4 px-4"
              id="file_input"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </label>
        </section>
        <section>
          {data.length > 0 && (
            <div className="mt-4 outline-none">
               <table className="min-w-full leading-normal transition-colors duration-300 bg-gray-100 dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
                
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key, index) => (
                      <th
                        key={index}
                        className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider transition-colors duration-300"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white dark:bg-slate-600 transition-colors duration-300"
                    >
                      {Object.values(row).map((value, index) => (
                        <td
                          key={index}
                          className="px-5 py-2 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <div className="pt-4 outline-none">
            {!isUploading && isPreviewing && (
              <>
                <button
                  onClick={handleUpload}
                  disabled={data.length === 0}
                  className="bg-black text-sm rounded-full font-semibold text-gray-100 px-3 py-2 hover:bg-slate-500 dark:hover:bg-blue-600"
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-sm rounded-full font-semibold text-white px-3 py-2 ml-2 hover:bg-red-600"
                >
                  Cancelar
                </button>
              </>
            )}
            {isUploading && <p>Cargando...</p>}
          </div>
        </section>
      </div>  
    </div>
  );
};

export default MassiveAdd;
