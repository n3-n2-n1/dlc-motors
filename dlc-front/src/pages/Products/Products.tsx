import { useParams } from "react-router-dom";
import { useState } from "react";
import TableList from "../../components/TableList/TableList";
import Actions from "../../components/Actions/Actions";
import QRCodeScanner from "../../components/qrScanner/qrScanner";
import Navbar from "../../components/Navbar/Navbar";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";

function Products() {
  const { category } = useParams();
  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>([]);

  const ProductFilterConfig: FilterConfig[] = [
    {
      key: "Origen",
      label: "Origen",
      type: "dropdown", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    },
    {
      key: "Rubro",
      label: "Rubro",
      type: "dropdown", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    },
    {
      key: "Marca",
      label: "Marca",
      type: "dropdown", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex overflow-hidden text-sm">
      <div className="flex-grow h-full flex flex-col">
        <div className="flex-grow bg-gray-900">
          <div className="flex justify-between items-center sm:p-6 md:p-4">
            <Navbar title="Productos" subtitle=" " />
            <FiltroFloat filtersConfig={ProductFilterConfig}  />
            <div className="flex items-center">
              <Actions />
            </div>
          </div>
          <TableList category={category} />
        </div>
      </div>
    </div>
  );
}

export default Products;
