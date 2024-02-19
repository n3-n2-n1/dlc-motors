import { useParams } from "react-router-dom";

import TableList from "../../components/TableList/TableList";
import Actions from "../../components/Actions/Actions";
import QRCodeScanner from "../../components/qrScanner/qrScanner";

// import Pagination from "../../components/Pagination/Pagination";
// import Filter from "../../components/Filter/Filter";

// Inside your component

function Products() {
  const { category } = useParams();

  return (
    <div className="bg-gray-900 text-white h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="flex-grow bg-gray-900">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between w-full">
                <h1 className="text-3xl mb-2 font-semibold text-white">
                  Productos
                </h1>
                <div className="flex space-x-2 sm:space-x-4">
                  <Actions />
                </div>
              </div>
            </div>
            <TableList category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
