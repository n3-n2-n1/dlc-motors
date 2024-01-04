import ErrorCard from "../../components/ErrorCard/ErrorCard"
import ErrorInform from "../../components/ErrorInform/ErrorInform"

const isOutcome = true;
const OutcomeObservations = [] || undefined

const products = [] || undefined

const Errors = () => {
  return (
    <div className="flex flex-col overflow-x-auto w-full bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">

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