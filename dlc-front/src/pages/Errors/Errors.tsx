import ErrorCard from "../../components/ErrorCard/ErrorCard"
import ErrorInform from "../../components/ErrorInform/ErrorInform"
import { Link } from "react-router-dom"

const OutcomeObservations = [] || undefined

const products = [] || undefined

const Errors = () => {
  return (
    <div className="flex flex-col overflow-x-auto w-full bg-gray-900 flex text-sm h-screen pt-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-3xl text-white font-weight-300">Errores</h1>
        </div>
        <div className="bg-white rounded rounded-full justify-center pt-1 hover:bg-blue-400">
          <Link to="/historyView">
          <button className="p-4 text-md text-gray-800 font-bold">Historial</button>
          </Link>
        </div>
      </div>


      <div className="flex flex-col">

      <div className="px-4 pb-4 rounded-md bg-gray-800">
      <ErrorInform observationsList={OutcomeObservations} products={products} />
      </div>
    
      </div>


    </div>
  )
  }  

export default Errors