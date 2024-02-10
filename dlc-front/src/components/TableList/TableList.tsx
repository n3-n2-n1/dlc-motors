import { useState, useEffect } from "react";

import { useSearchContext } from "../../contexts/SearchContext.tsx";
import Pagination from "../Pagination/Pagination";
import OptionsIcon from "../icon/OptionsIcon/OptionsIcon";
import ArrowIcon from "../icon/ArrowIcon/ArrowIcon";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths.ts";
import { deleteProducts } from "../../utils/Handlers/Handlers.tsx";

function TableList() {
  const { searchResults, currentPage, itemsPerPage, products } = useSearchContext();
  const [confirmationIndex, setConfirmationIndex] = useState(-1);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    setOpenIndex(-1);
    setConfirmationIndex(-1);
  }, [currentPage]);

  useEffect(() => {
  console.log("Search Results:", searchResults);
  console.log("Products:", products);
  // Otros console.log si es necesario
}, [searchResults, products, currentPage]);

  // const itemsToDisplay = searchResults || products
  const itemsToDisplay = Array.isArray(searchResults) ? searchResults : Array.isArray(products) ? products : [];

  const columns = [
    "Codigo",
    "SKU",
    "OEM",
    "Descripción",
    "Rubro",
    "Origen",
    "MarcasCompat",
    "Precio",
    "Kit",
    "Stock",
    "¿Stock?",
    "Devoluciones",
    "Check",
  ];
  
  // Estado inicial: todas las columnas tienen un ancho normal
  const [columnWidths, setColumnWidths] = useState(new Array(columns.length).fill('normal'));

  const toggleColumnWidth = (index: any) => {
    // Cambia el ancho de la columna especificada
    setColumnWidths(
      columnWidths.map((width, i) => (i === index ? (width === 'normal' ? 'min' : 'normal') : width))
    );
  };

  // Estilos para columnas minimizadas y normales
  const columnStyles = (width: any) => ({
    minWidth: width === 'min' ? '30px' : 'auto',
    maxWidth: width === 'min' ? '30px' : 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderRight: '1px solid #aaa', // Ajusta el color del borde según tu tema
  });

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
      <div className="overflow-y-auto max-h-[calc(108vh-3rem)]">
    <table className="w-full text-left">
      <thead className="sticky top-0 bg-gray-900 text-gray-100 align-center">
        <tr className="text-gray-100">
          {columns.map((column, index) => (
            <th
              key={index}
              onClick={() => toggleColumnWidth(index)}
              className="cursor-pointer font-bold text-gray-400 bg-gray-900 px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
              style={columnStyles(columnWidths[index])}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>

          <tbody className="text-gray-100">
            {itemsToDisplay
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((product, index) => (
                <tr key={index}>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Codigo || '-'}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.CodTango || '-'}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.CodOEM || '-'}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    <div className="">
                      {product.Producto || '-'}
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800 md:table-cell hidden">
                    {product.Rubro || '-'}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Origen || product.CodBarras}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.marcasCompatibles || '-'}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Precio || '-'}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.hasStock ? "Sí" : "No"}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Kit ? "Sí" : "No"}
                  </td>
                  
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.Devoluciones || '-'}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.CodBarras ? '-' : '-' }
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
      <div className="mt-4">

      <Pagination />
      </div>
    </>
  );
}

export default TableList;
