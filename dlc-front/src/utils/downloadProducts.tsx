import { fetchProducts } from "./Handlers/Handlers";
import * as XLSX from 'xlsx';


const exportToExcel = async () => {
    try {
      const products = await fetchProducts();
  
      // Crear una hoja de cálculo
      const ws = XLSX.utils.json_to_sheet(products);
  
      // Crear un libro de Excel
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Productos');
  
      // Guardar el archivo Excel
      XLSX.writeFile(wb, 'productos.xlsx');
  
      console.log('Productos exportados a Excel correctamente.');
    } catch (error) {
      console.error('Error al exportar productos a Excel:', error);
    }
  };


export {exportToExcel}
  