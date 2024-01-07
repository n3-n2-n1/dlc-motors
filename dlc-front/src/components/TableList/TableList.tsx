import { useState, useEffect } from "react";

import { useSearchContext } from '../../contexts/SearchContext.tsx';
import Pagination from "../Pagination/Pagination";
import OptionsIcon from "../icon/OptionsIcon/OptionsIcon";
import ArrowIcon from "../icon/ArrowIcon/ArrowIcon";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths.ts";

function TableList() {



  const { searchResults, currentPage, itemsPerPage, products } = useSearchContext();

  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    setOpenIndex(-1);
  }, [currentPage]);
  
  const itemsToDisplay = searchResults || products;

  const columns = [
    'Acciones',
    'Imagen',
    'Codigo',
    'CodigoOEM',
    'Descripción',
    'Rubro',
    'Precio',
    'Stock',
    'Origen',
    'MarcasCompat',
    '¿Stock?',
    'Devoluciones',
    'Kit',
    'Etiqueta'
  ]

  return (
    <> 

    <div className="overflow-y-auto max-h-[calc(88vh-3rem)]">
       <table className="w-full text-left">
       <thead className="sticky top-0 bg-gray-900 text-gray-100 align-center">
        <tr className="text-gray-100">
          {columns.map((column, index) => (
            <th
              key={index}
              className={`font-bold text-gray-400 bg-gray-900 px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 ${
                index === 6 ? 'hidden md:table-cell' : '' // Hide column at index 6 on medium screens
              }`}
            >
              {column}
            </th>
          ))}
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
                        
                        <Link to="">
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Editar
                        </p>
                        </Link>

                        <Link to="">
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Eliminar
                        </p>
                        </Link>

                        <Link to={paths.upload}>
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Cargar ingreso
                        </p>
                        </Link>
                        <Link to={paths.outcomes}>
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Cargar Egreso
                        </p>
                        </Link>

                        <Link to="">
                        <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                          Cargar Devolución
                        </p>
                        </Link>

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
      <Pagination/>
    </>
  );
}

export default TableList;
