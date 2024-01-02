// import Pagination from "../../components/Pagination/Pagination";
import TableList from "../../components/TableList/TableList";
import Filter from "../../components/Filter/Filter";
import Actions from "../../components/Actions/Actions";

function Products() {
  return (
    <div className="bg-gray-900 text-white h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="flex-grow bg-gray-900">
          <div className="sm:p-5 p-2">
            <div className="flex flex-row items-center">
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
