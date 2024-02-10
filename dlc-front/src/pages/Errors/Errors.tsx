import { Link } from "react-router-dom";

import { useSearchContext } from "../../contexts/SearchContext";

import { ErrorsObservations } from "../../routes/routes";

import ErrorInform from "../../components/ErrorInform/ErrorInform";

const Errors = () => {
  const { products } = useSearchContext();

  return (
    <div className="flex flex-col overflow-x-auto w-full bg-gray-900 flex text-sm h-screen pt-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-3xl text-white font-weight-300">Errores</h1>
        </div>
        <div className="bg-white rounded rounded-full justify-center hover:bg-blue-700">
          <div className="">
            <Link to="/historyView">
              <button className="p-3 text-md text-gray-800 font-bold hover:text-white">
                Historial
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <ErrorInform
          formName="Errores"
          observationsList={ErrorsObservations}
          products={products}
        />
      </div>
    </div>
  );
};

export default Errors;
