import { fetchProducts } from "./Handlers/Handlers";
import * as XLSX from "xlsx";
import React from "react";
import { toast } from "react-toastify";

const ExportButton = ({ modifiedNodes }) => {
  const handleExport = async () => {
    try {
      console.log("modifiedNodes", modifiedNodes);
      const products = await fetchProducts();
      const data = (modifiedNodes && Object.keys(modifiedNodes).length > 0) ? modifiedNodes : products;

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Productos");
      XLSX.writeFile(wb, "productos.xlsx");
    } catch (error) {
      console.error("Error al exportar productos a Excel:", error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex flex-col items-center justify-center bg-black text-white rounded-full shadow-lg md:shadow-xl px-4 dark:hover:bg-blue-800 hover:bg-gray-700 hover:text-white dark:bg-blue-600 select-none"
    >
      <h3 className="text-m font-semibold my-2 rounded-2xl hover:text-white select-none">
        Descargar filtrados
      </h3>
    </button>
  );
};

export const AnualExport = () => {
  const handleAnualExport = async () => {
    try {
      const products = await fetchProducts();
      const data = products.map((product) => ({
        codigo: product.SKU,
        descripcion: product.descripcion,
        stock: product.stock,
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Productos");
      XLSX.writeFile(wb, "productos.xlsx");

      toast.success("Cierre exportados a Excel correctamente.");
    } catch (error) {
      console.error("Error al exportar productos a Excel:", error);
    }
  };

  return (
    <button
      onClick={handleAnualExport}
      className="flex flex-col items-center justify-center bg-black text-white rounded-full shadow-lg md:shadow-xl px-4 dark:hover:bg-blue-800 hover:bg-gray-700 hover:text-white dark:bg-blue-600 select-none"
    >
      <h3 className="text-m font-semibold my-2 rounded-2xl hover:text-white select-none">
        Cierre anual
      </h3>
    </button>
  );
};

export default ExportButton;
