import ErrorCard from "../../components/ErrorCard/ErrorCard"
import ErrorInform from "../../components/ErrorInform/ErrorInform"

const isOutcome = true;
const OutcomeObservations = [] || undefined

const products = [] || undefined

const Errors = () => {
  return (
    <div>
      <ErrorCard />
      <ErrorInform isOutcome={isOutcome} observationsList={OutcomeObservations} products={products} />

    </div>
    
  )
}

export default Errors