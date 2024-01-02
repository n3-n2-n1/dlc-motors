import ErrorCard from "../../components/ErrorCard/ErrorCard"
import ErrorInform from "../../components/ErrorInform/ErrorInform"

const isOutcome = true;
const OutcomeObservations = [] || undefined

const products = [] || undefined

const Errors = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 text-sm">
    
      <ErrorInform isOutcome={isOutcome} observationsList={OutcomeObservations} products={products} />


      {/* Esto no deberia ser asi  */}
      <div className="flex">
        <ErrorCard />
        <ErrorCard />
        <ErrorCard />
        <ErrorCard />
      </div>


    </div>
    
  )
}

export default Errors