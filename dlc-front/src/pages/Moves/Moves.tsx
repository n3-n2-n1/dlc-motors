import { fetchHistorial } from "../../utils/Handlers/Handlers";
import { useEffect } from "react";
import { useState } from "react";
import { Historial } from "../../Interfaces/Historial";
import Dashcards from "../../components/Dashcards/Dashcards";
import Errors from "../Errors/Errors";
import InventoryForm from "../Management/InventoryForm";
import IncomesOutcomesForm from "../Management/IncomesOutcomesForm";
import Returns from "../Returns/Returns";
import { IncomeObservations } from "../../routes/routes";
import { OutcomeObservations } from "../../routes/routes";
import { useSearchContext } from "../../contexts/SearchContext";


const Moves: React.FC = () => {

  const { products } = useSearchContext();
  
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);
  const [historial, setHistorial] = useState<Historial[]>([]);

  const changeToErrors = () => setCurrentComponent(<Errors />);
  const changeToIncomes = () => setCurrentComponent(<IncomesOutcomesForm formName="Ingreso" observationsList={IncomeObservations} products={products} />);
  const changeToInventory = () => setCurrentComponent(<InventoryForm products={products} />);
  const changeToOutcomes = () => setCurrentComponent(<IncomesOutcomesForm formName="Egreso" observationsList={OutcomeObservations} products={products} />);
  const changeToReturns = () => setCurrentComponent(<Returns products={products}/>);


  // Falta egresos
  // const changeToErrors = () => setCurrentComponent(<Errors />);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historialData = await fetchHistorial();
        // Asegúrate de que historialData sea un arreglo
        if (Array.isArray(historialData)) {
          setHistorial(historialData);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 bg-gray-100 bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm p-6 overflow-y-hidden">
      <div className="flex-row">
        <h1 className="text-4xl mb-2 text-white font-weight-300">
          Historial de Movimientos
        </h1>
        <h2 className="text-gray-500 mb-4">
          Visualizá sobre movimientos generales <br />
        </h2>
      </div>
      <section className="flex flex-row gap-6"> 

      <Dashcards buttons={[{ text: "Errores", action: changeToErrors, link:'' }]} />
      <Dashcards buttons={[{ text: "Ingresos", action: changeToIncomes, link:'' }]} />
      <Dashcards buttons={[{ text: "Inventario", action: changeToInventory, link:'' }]} />
      <Dashcards buttons={[{ text: "Egresos", action: changeToOutcomes, link:'' }]} />
      <Dashcards buttons={[{ text: "Devoluciones", action: changeToReturns, link:'' }]} />

      </section>
      <div className="border-t border-gray-200 mt-4">
        {currentComponent}
      </div>
    </div>
  );
};

export default Moves;
