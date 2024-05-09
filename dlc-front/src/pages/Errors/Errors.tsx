import { Link } from "react-router-dom";

import { useSearchContext } from "../../contexts/SearchContext";

import { useBrandsObservations } from "../../contexts/BrandsObservationsContext.tsx";

import ErrorInform from "../../components/ErrorInform/ErrorInform";

const Errors = () => {
  const { products } = useSearchContext();
  const { errorsObservations } = useBrandsObservations();

  return (
    <div className="flex flex-col overflow-x-auto w-fulltext-sm h-screen pt-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ">
        <h1 className="text-3xl mb-2 text-gray-600 dark:text-gray-100 font-weight-300 transition-colors duration-300 ">Errores</h1>
        <div className="bg-black dark:bg-blue-500 hover:dark:bg-blue-600 text-white dark:text-gray-600 rounded-full justify-center hover:bg-gray-800 mr-6">
          <Link to="/historyView/Error">
            <button className="p-3 text-md font-bold text-gray-200 dark:text-white">
              Historial
            </button>
          </Link>
        </div>
      </div>

        <ErrorInform
          formName="Errores"
          observationsList={errorsObservations}
          products={products}
        />
    </div>
  );
};

export default Errors;
