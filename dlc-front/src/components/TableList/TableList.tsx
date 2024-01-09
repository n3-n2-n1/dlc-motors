import { useState, useEffect } from "react";

import { useSearchContext } from "../../contexts/SearchContext.tsx";
import Pagination from "../Pagination/Pagination";
import OptionsIcon from "../icon/OptionsIcon/OptionsIcon";
import ArrowIcon from "../icon/ArrowIcon/ArrowIcon";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths.ts";
import { deleteProducts } from "../../utils/Handlers/Handlers.tsx";

function TableList() {
  const { searchResults, currentPage, itemsPerPage, products } =
    useSearchContext();

  const [confirmationIndex, setConfirmationIndex] = useState(-1);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    setOpenIndex(-1);
    setConfirmationIndex(-1);
  }, [currentPage]);

  const itemsToDisplay = searchResults || products;

  const columns = [
    "Acciones",
    "Imagen",
    "Codigo",
    "CodigoOEM",
    "Código Tango",
    "Descripción",
    "Rubro",
    "Precio",
    "Stock",
    "Origen",
    "MarcasCompat",
    "¿Stock?",
    "Devoluciones",
    "Kit",
    "Código de Barras",
  ];

  const handleDeleteConfirmation = (index: any) => {
    setConfirmationIndex(index);
  };

  const handleDelete = () => {
    const productToDelete = itemsToDisplay[confirmationIndex];
    console.log(productToDelete);
    if (productToDelete) {
      const prodCod = productToDelete.CodOEM;
      deleteProducts(prodCod);
      setOpenIndex(-1);
      setConfirmationIndex(-1);
    }
  };
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
                    index === 6 ? "hidden md:table-cell" : "" // Hide column at index 6 on medium screens
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
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((product, index) => (
                <tr key={index}>
                  <td className="relative sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
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
                            <p
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer"
                              onClick={() => handleDeleteConfirmation(index)}
                            >
                              Eliminar
                            </p>
                          </Link>

                          <Link to="">
                            <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                              Agregar ingreso
                            </p>
                          </Link>

                          <Link to="">
                            <p className="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                              Agregar egreso
                            </p>
                          </Link>
                        </div>
                      </>
                    )}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-100">
                    <div className="flex items-center">
                      <img
                        src="/vite.svg"
                        alt={`foto producto ${product.Codigo}`}
                      />
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Codigo.length > 5
                      ? `${product.Codigo.slice(0, 5)}...` // Trunca la cadena si tiene más de 20 caracteres
                      : product.Codigo}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {/* {product.CodBarras.length > 6
                      ? `${product.CodBarras.slice(0, 6)}...` // Trunca la cadena si tiene más de 20 caracteres
                      : product.CodBarras} */}

                    {product.CodOEM}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.CodTango}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    <div className="">
                      {product.Producto.length > 16
                        ? `${product.Producto.slice(0, 16)}...` // Trunca la cadena si tiene más de 20 caracteres
                        : product.Producto}
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800 md:table-cell hidden">
                    {product.Rubro.length > 6
                      ? `${product.Rubro.slice(0, 6)}...` // Trunca la cadena si tiene más de 20 caracteres
                      : product.Rubro}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800 text-green-500">
                    ${product.Precio}
                  </td>

                  {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              {product.marcasCompatibles}
            </td> */}
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {/* cantidadStock */}
                    {product.Stock}
                  </td>
                  {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.CodBarras.length > 4
                      ? `${product.CodBarras.slice(0, 4)}...` // Trunca la cadena si tiene más de 20 caracteres
                      : product.CodBarras}
                  </td> */}
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Origen}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.marcasCompatibles}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.hasStock ? "Sí" : "No"}
                  </td>

                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Devoluciones}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Kit ? "Sí" : "No"}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.CodBarras.length > 4
                      ? `${product.CodBarras.slice(0, 4)}...` // Trunca la cadena si tiene más de 20 caracteres
                      : product.CodBarras}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {confirmationIndex !== -1 && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-4 rounded-md">
            <p>¿Estás seguro de que deseas eliminar este elemento?</p>
            <button
              className="text-sm font-bold p-4 gap-6"
              onClick={handleDelete}
            >
              Sí
            </button>
            <button onClick={() => setConfirmationIndex(-1)}>No</button>
          </div>
        </div>
      )}

      <Pagination />
    </>
  );
}

export default TableList;
