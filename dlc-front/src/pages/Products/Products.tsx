// import Pagination from "../../components/Pagination/Pagination";
import TableList from "../../components/TableList/TableList";
import Filter from "../../components/Filter/Filter";
import Actions from "../../components/Actions/Actions";

function Products() {
  return (
    <div className="bg-gray-900 text-white h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="flex-grow bg-gray-900">
          <div className="sm:p-6 p-6">
            <div className="flex flex-row items-center align-center">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
                <div className="mr-6 flex gap-6">
                  <h1 className="text-4xl mb-2 text-white font-weight-300">
                    Productos
                  </h1>
                  
                </div>
                <div className="justify-center">
                  <div className="mt-6"></div>
                </div>
              </div>
              <Filter />
              <Actions />
            </div>
            <TableList />
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
