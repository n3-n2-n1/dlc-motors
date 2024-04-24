import { useState, useEffect } from "react";

import { useSearchContext } from "../../contexts/SearchContext.tsx";
import Pagination from "../Pagination/Pagination";
import { deleteProducts } from "../../utils/Handlers/Handlers.tsx";
import { useNavigate } from "react-router-dom";

import OptionsIcon from "../icon/OptionsIcon/OptionsIcon";
// import ArrowIcon from "../icon/ArrowIcon/ArrowIcon";
// import { Link } from "react-router-dom";
// import { paths } from "../../routes/paths.ts";



function TableList({ category }) {
  const navigate = useNavigate();

  const {
    searchResults,
    currentPage,
    itemsPerPage,
    products,
    setProducts,
    setTotalPages,
  } = useSearchContext();
  const [confirmationIndex, setConfirmationIndex] = useState(-1);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    setOpenIndex(-1);
    setConfirmationIndex(-1);
  }, [currentPage]);

  const itemsToDisplay = Array.isArray(searchResults)
    ? searchResults
    : Array.isArray(products)
    ? category
      ? products.filter((product) => product.rubro === category)
      : products
    : [];


  useEffect(() => {
    if (category) {
      setTotalPages(Math.ceil(itemsToDisplay.length / itemsPerPage));
    }
  }, [category, itemsPerPage, itemsToDisplay.length, setTotalPages]);

  const columns = [
    "Codigo",
    "SKU",
    "OEM",
    "Descripción",
    "Rubro",
    "Origen",
    "MarcasCompat",
    "Kit",
    "Stock",
    "Devoluciones",
    "Check",
  ];

  // Initialize all columns as not shrunk
  const [shrunkColumns, setShrunkColumns] = useState(
    new Array(columns.length).fill(false)
  );

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleColumnWidth = (index: any) => {
    setShrunkColumns((shrunkColumns) =>
      shrunkColumns.map((isShrunk, i) => (i === index ? !isShrunk : isShrunk))
    );
  };

  const columnStyles = (isShrunk: boolean) => ({
    width: isShrunk ? "30px" : "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderRight: "0px solid #aaa",
  });

  const handleEdit = (pageIndex: string) => {
    const indexInOriginalArray = (currentPage - 1) * itemsPerPage + pageIndex;
    const productToEdit = itemsToDisplay[indexInOriginalArray];
    if (productToEdit) {
      const prodCod = productToEdit.codigoInt;
      navigate(`/productos/editar/${prodCod}`);
    }
  };

  const handleDeleteConfirmation = (pageIndex: any) => {
    const indexInOriginalArray = (currentPage - 1) * itemsPerPage + pageIndex;
    setConfirmationIndex(indexInOriginalArray);
    // setConfirmationIndex(index);
  };

  const handleDelete = () => {
    const productToDelete = itemsToDisplay[confirmationIndex];
    const prodCod = productToDelete.codigoInt;
    if (prodCod) {
      deleteProducts(prodCod);
      // navigate(0)
    }
  };

  return (
    <>
      <div className="overflow-x-auto h-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-gray-900 text-gray-100">
            <tr>
              <th className="cursor-pointer bg-gray-900 px-3 pb-3 items-center border-b pt-2 justify-center text-center">⚙️</th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => toggleColumnWidth(index)}
                  className="cursor-pointer bg-gray-900 px-3 pb-3 items-center border-b pt-2 justify-center"
                  style={columnStyles(shrunkColumns[index])}
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
                <tr key={index} className="h-full">
                  <td className="relative h-full flex items-center justify-center hover:bg-slate-600">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      className="flex items-center justify-center px-4 p-2 h-full"
                    >
                      <OptionsIcon color="white" className="h-full" />
                    </button>
                    {openDropdown === index && (
                      <div className="z-50 absolute top-8 left-8 w-32 rounded-md shadow-lg bg-gray-700">
                        <div className="py-1">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                            role="menuitem"
                            onClick={() => handleEdit(index)}
                          >
                            Editar
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                            role="menuitem"
                            onClick={() => handleDeleteConfirmation(index)}
                          >
                            Eliminar
                          </a>
                        </div>
                      </div>
                    )}
                    
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.codigoInt || "-"}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800 ">
                    {product.SKU || "-"}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.codOEM || "-"}
                  </td>
                  <td className="sm:px-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    <div className="">{product.descripcion || "-"}</div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.rubro || "-"}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.origen}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800">
                    {product.marcasCompatibles || "-"}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800  ">
                    {product.kit ? product.kit : "-"}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-600 dark:border-gray-800  ">
                    {product.contadorDevoluciones || "-"}
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
      <div className="px-20">
        <Pagination />
      </div>
    </>
  );
}

export default TableList;
