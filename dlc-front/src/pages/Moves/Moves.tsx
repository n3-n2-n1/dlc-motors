import { useState } from "react";
import Dashcards from "../../components/Dashcards/Dashcards";
import Errors from "../Errors/Errors";
import InventoryForm from "../Management/InventoryForm";
import IncomesOutcomesForm from "../Management/IncomesOutcomesForm";
import Returns from "../Returns/Returns";
import { IncomeObservations } from "../../routes/routes";
import { OutcomeObservations } from "../../routes/routes";
import { DeliveriesObservations } from "../../routes/routes";
import { useSearchContext } from "../../contexts/SearchContext";
import DeliveryForm from "../../components/DeliveryForm/DeliveryForm";


const Moves: React.FC = () => {

  const { products } = useSearchContext();
  
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);
  const changeToErrors = () => setCurrentComponent(<Errors />);
  const changeToIncomes = () => setCurrentComponent(<IncomesOutcomesForm formName="Ingreso" observationsList={IncomeObservations} products={products} />);
  const changeToInventory = () => setCurrentComponent(<InventoryForm products={products} />);
  const changeToOutcomes = () => setCurrentComponent(<IncomesOutcomesForm formName="Egreso" observationsList={OutcomeObservations} products={products} />);
  const changeToReturns = () => setCurrentComponent(<Returns products={products}/>);
  const changeToDelivery = () => setCurrentComponent(<DeliveryForm formName="Pedidos" products={products} observationsList={DeliveriesObservations}/>);

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen overflow-auto text-sm p-6 overflow-y-hidden">
      <div className="flex-row">
        <h1 className="text-4xl mb-2 text-white font-weight-300">
          Movimientos
        </h1>
        <h2 className="text-gray-500 mb-4">
          Generá movimientos<br />
        </h2>
      </div>
      <section className="flex flex-row gap-6"> 

      <Dashcards buttons={[{ text: "Errores", action: changeToErrors, link:'' }]} />
      <Dashcards buttons={[{ text: "Ingresos", action: changeToIncomes, link:'' }]} />
      <Dashcards buttons={[{ text: "Inventario", action: changeToInventory, link:'' }]} />
      <Dashcards buttons={[{ text: "Egresos", action: changeToOutcomes, link:'' }]} />
      <Dashcards buttons={[{ text: "Devoluciones", action: changeToReturns, link:'' }]} />
      <Dashcards buttons={[{ text: "Pedidos", action: changeToDelivery, link:'' }]} />

      </section>
      <div className="border-t border-gray-200 mt-4">
        {currentComponent}
      </div>
    </div>
  );
};

export default Moves;
