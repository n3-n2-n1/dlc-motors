import { Link } from "react-router-dom";

import { useSearchContext } from "../../contexts/SearchContext";

import { useBrandsObservations } from "../../contexts/BrandsObservationsContext.tsx";

import ErrorInform from "../../components/ErrorInform/ErrorInform";

const Errors = () => {
  const { products } = useSearchContext();
  const { errorsObservations } = useBrandsObservations();

  return (
    <div className="flex flex-col overflow-x-auto w-full bg-gray-900 text-sm h-screen pt-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <h1 className="text-3xl mb-2 text-white font-weight-300">Errores</h1>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full justify-center hover:bg-gray-800 mr-6">
          <Link to="/historyView">
            <button className="p-3 text-md font-bold text-gray-600 dark:text-white">
              Historial
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full bg-gray-100">
        <ErrorInform
          formName="Errores"
          observationsList={errorsObservations}
          products={products}
        />
      </div>
    </div>
  );
};

export default Errors;
