import { useState, useEffect } from "react";

import { useSearchContext } from '../../contexts/SearchContext.tsx';
import Pagination from "../Pagination/Pagination";
import OptionsIcon from "../icon/OptionsIcon/OptionsIcon";
import ArrowIcon from "../icon/ArrowIcon/ArrowIcon";

function TableList() {
  const { searchResults, currentPage, itemsPerPage, products } = useSearchContext();

  const [openIndex, setOpenIndex] = useState(-1);
  // const [backendData, setBackendData] = useState([]); 

  useEffect(() => {
    setOpenIndex(-1); // reset openIndex when currentPage changes
  }, [currentPage]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/productos");
  //       const data = await response.json();
  //       setBackendData(data);
  //     } catch (error) {
  //       console.error("Error fetching data from backend:", error);
  //       // Agrega lógica para manejar el error, por ejemplo, mostrar un mensaje de error al usuario
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  // const itemsToDisplay = searchResults || backendData;
  const itemsToDisplay = searchResults || products;

  return (
    <> 

    <div className="overflow-y-auto max-h-[calc(88vh-3rem)]">
       <table className="w-full text-left">
        <thead className="sticky top-0 bg-gray-900 text-gray-100 align-center">
          <tr className="text-gray-100">
            {/* Las columnas deberían ser clickeables para setear un orden */}
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Acciones
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Imagen
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Código
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Cod.OEM
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Descripción
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Rubro
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
              Precio
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Stock
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Origen
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              MarcasCompat.
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Stock(cant.)
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              ¿Stock?
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Devoluciones
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Kit
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Etiqueta
            </th>
          </tr>
        </thead>

        <tbody className="text-gray-100">
          {/* {products.map((product, index) => ( */}
          
          {itemsToDisplay
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((product, index) => (
              <tr key={index}>
                <td className="relative sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                  >
                    <OptionsIcon />
                  </button>
                  {openIndex === index && (
                    <>
                      <ArrowIcon className="rotate-180 text-gray-400 absolute right-4 top-3.5" />
                      <div className="absolute top-0 left-12 mt-2 w-48 bg-gray-800 border border-gray-600 divide-y divide-gray-600 rounded-md shadow-lg text-white z-50">
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Editar
                        </p>
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Eliminar
                        </p>
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Cargar ingreso
                        </p>
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Cargar Egreso
                        </p>
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Cargar Devolución
                        </p>
                      </div>
                    </>
                  )}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center">
                    <img
                      src="/vite.svg"
                      alt={`foto producto ${product.Codigo}`}
                    />
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  
                  {product.Codigo}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  {product.CodBarras}
                  {/* {product.codigoOEM} */}
                </td>
                {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {product.codigoTango}
            </td> */}
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  {product.Producto}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                  {product.Rubro}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">
                  {product.Precio}
                </td>
                {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {product.origen}
            </td> */}
                {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {product.marcasCompatibles}
            </td> */}
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  {/* cantidadStock */}
                  {product.Stock}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  {/* cantidadStock */}
                  {product.CodBarras}
                </td> 
                {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {product.stock ? "Sí" : "No"}
            </td> */}

                {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {`Correctas ${product.devoluciones.correctas}`}
              <br />
              {`Rotas ${product.devoluciones.rotas}`}
            </td> */}
                {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {product.kits ? "Sí" : "No"}
            </td> */}
                {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {product.tag}
            </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
      <Pagination
      />
    </>
  );
}

export default TableList;
