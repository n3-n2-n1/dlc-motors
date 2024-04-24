import ObservationEdit from "./ObservationEdit";
import BrandsEdit from "./BrandsEdit";
import CategoriesEdit from "./CategoriesEdit";

import Navbar from "../../components/Navbar/Navbar";

function Backoffice() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 w-full h-screen overflow-auto border-r border-gray-500 dark:border-gray-800 transition-colors duration-300 select-none">
        <div className="p-2 md:p-1 dark:bg-gray-900  dark:text-white">
          <div className="p-4 md:p-6 dark:bg-gray-900 dark:text-white">
            <Navbar title="Backoffice" />
          </div>
          <ObservationEdit />
          <BrandsEdit />
          <CategoriesEdit />
        </div>
      </div>
    </>
  );
}

export default Backoffice;
