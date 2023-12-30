import { useState, useEffect } from "react";

import { useSearchContext } from '../../contexts/SearchContext.tsx';

import Pagination from "../Pagination/Pagination";

import OptionsIcon from "../icon/OptionsIcon/OptionsIcon";
import ArrowIcon from "../icon/ArrowIcon/ArrowIcon";

function TableList() {
  const { searchResults, currentPage, itemsPerPage, products } = useSearchContext();

  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    setOpenIndex(-1); // reset openIndex when currentPage changes
  }, [currentPage]);
  
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/path/to/mocks.json"); // Reemplaza con la ruta correcta
  //       const data = await response.json();
  //       setProducts(data.products);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
    
  //   fetchProducts();
  // }, []);
  
  const itemsToDisplay = searchResults || products;

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
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
              Codigo OEM
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
              Marcas Compatibles
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Cantidad Stock
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Hay Stock
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Devoluciones
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Es Kit
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
              Etiqueta
            </th>
          </tr>
        </thead>

        <tbody className="text-gray-600 dark:text-gray-100">
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
      <Pagination
      />
    </>
  );
}

export default TableList;
