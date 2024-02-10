// import Pagination from "../../components/Pagination/Pagination";
import TableList from "../../components/TableList/TableList";
import Filter from "../../components/Filter/Filter";
import Actions from "../../components/Actions/Actions";

function Products() {
  return (
    <div className="bg-gray-900 text-white h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="flex-grow bg-gray-900">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between w-full">
                <h1 className="text-2xl sm:text-4xl mb-2 text-white font-light">
                  Productos
                </h1>
                <div className="flex space-x-2 sm:space-x-4">
                  <Actions />
                </div>
              </div>
            </div>
            <TableList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
