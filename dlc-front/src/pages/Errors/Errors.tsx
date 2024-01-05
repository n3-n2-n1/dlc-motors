import ErrorCard from "../../components/ErrorCard/ErrorCard"
import ErrorInform from "../../components/ErrorInform/ErrorInform"

const isOutcome = true;
const OutcomeObservations = [] || undefined

const products = [] || undefined

const Errors = () => {
  return (
    <div className="flex flex-col overflow-x-auto w-full bg-gray-900 flex overflow-hidden text-sm p-6">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-4xl mb-2 text-white font-weight-300">Errores</h1>
          <h2 className="text-gray-500">Reporta y visualiza errores.</h2>
        </div>
        <div className="justify-center">
          <div className="mt-6"></div>
        </div>
      </div>
      <div className="w-full h-full bg-gray-900">
      <ErrorInform isOutcome={isOutcome} observationsList={OutcomeObservations} products={products} />

      </div>
    

      <div className="w-full flex p-10 bg-gray-900">
  
      {/* Esto ahora debería estar junto a ErrorInform */}
      <ErrorCard />
  

      </div>
    </div>
  )
  }  

export default Errors