import { useState } from "react";
import Dashcards from "../../components/Dashcards/Dashcards";
import Errors from "../Errors/Errors";
import InventoryForm from "../Management/InventoryForm";
import IncomesOutcomesForm from "../Management/IncomesOutcomesForm";
import Returns from "../Returns/Returns";
import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import { DeliveriesObservations } from "../../routes/routes";

import { useSearchContext } from "../../contexts/SearchContext";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext.tsx";

import DeliveryForm from "../../components/DeliveryForm/DeliveryForm";
import Navbar from "../../components/Navbar/Navbar";


const Moves: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>("");

  const { products } = useSearchContext();
  const {
    incomesObservations,
    outcomesObservations,
  } = useBrandsObservations();

  
  
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);
  const changeToErrors = () => {setCurrentComponent(<Errors />); setSelectedButton("Errores");}
  const changeToIncomes = () => {setCurrentComponent(<IncomesOutcomesForm formName="Ingreso" observationsList={incomesObservations} products={products} />);    setSelectedButton("Ingresos");}
  const changeToInventory = () => {setCurrentComponent(<InventoryForm products={products} />);    setSelectedButton("Inventario");}
  const changeToOutcomes = () => {setCurrentComponent(<IncomesOutcomesForm formName="Egreso" observationsList={outcomesObservations} products={products} />);    setSelectedButton("Egresos");}
  const changeToReturns = () => {setCurrentComponent(<Returns products={products}/>);    setSelectedButton("Devoluciones");}
  const changeToDelivery = () => {setCurrentComponent(<DeliveryForm formName="Pedidos" products={products} observationsList={DeliveriesObservations} />);    setSelectedButton("Pedidos");}

  return (
    <>
    <PageTitle title="DLC Motors • Movimientos" />
    
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 xl:w-768 flex-shrink-0 dark:border-gray-800 h-full w-full overflow-auto text-sm p-6 overflow-y-hidden transition-colors duration-300 select-none">
      <div className="flex flex-row gap-2 justify-between">
      <Navbar title='Movimientos' subtitle="" />
        </div>
      <section className="flex flex-row gap-6 pt-4 mr-6"> 


      <Dashcards buttons={[{ text: "Errores", action: changeToErrors, link:'', isActive: selectedButton === "Errores"  }]} />
      <Dashcards buttons={[{ text: "Ingresos", action: changeToIncomes, link:'', isActive: selectedButton === "Ingresos"   }]} />
      <Dashcards buttons={[{ text: "Inventario", action: changeToInventory, link:'', isActive: selectedButton === "Inventario"   }]} />
      <Dashcards buttons={[{ text: "Egresos", action: changeToOutcomes, link:'', isActive: selectedButton === "Egresos"   }]} />
      <Dashcards buttons={[{ text: "Devoluciones", action: changeToReturns, link:'', isActive: selectedButton === "Devoluciones"   }]} />
      <Dashcards buttons={[{ text: "Pedidos", action: changeToDelivery, link:'', isActive: selectedButton === "Pedidos"   }]} />
      </section>
      <div className="border-t border-gray-200 mt-4 h-screen">
        {currentComponent}
      </div>
    </div>
    </>
  );
};

export default Moves;
