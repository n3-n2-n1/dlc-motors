import Dashcards from "../../components/Dashcards/Dashcards";
import { useState } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";
import { useFilterValues } from "../../contexts/FilterContext";
import { OutcomeObservations } from "../../routes/routes";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { CostFabricTable, CostImportedTable, CostResaleTable } from "../../components/TableMoves/TableMoves";
const Costs = () => {

  const { products } = useSearchContext();
  const [currentComponent, setCurrentComponent] =useState<React.ReactNode>(null);
  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>([]);
  const { filterValues, setFilterValues } = useFilterValues();


  const costFilterConfig: FilterConfig[] = [
    {
      key: "rubro",
      label: "Rubros",
      type: "dropdown", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
      options: [],
      
    }, 

    {
      key: "texto",
      label: "Ingrese texto...",
      type: "text", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    }, 

    {
      key: "marcas",
      label: "Marcas Compatibles",
      type: "dropdown",
      options: []
    }, 

    {
      key: "origen",
      label: "Origen",
      type: "dropdown", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
      options: ['Fabrica','Importado','Reventa'],
    }, 
  
  ]


    
  const changeToImported = () => {
    setCurrentComponent(<CostImportedTable costImported={[]}/>);
    setFilterConfig(costFilterConfig);
    setFilterValues({})
  };

  const changeToResale = () => {
    setCurrentComponent(<CostResaleTable costImported={[]}/>);
    setFilterConfig(costFilterConfig);
    setFilterValues({})
  };

  const changeToFabric = () => {
    setCurrentComponent(<CostFabricTable costImported={[]}/>);
    setFilterConfig(costFilterConfig);
    setFilterValues({})
  };

  return (
    <div className="flex flex-col bg-gray-900 bg-gray-100 bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm p-6">
      <div className="flex-row">
        <h1 className="text-4xl mb-2 text-white font-weight-300">
          Costos
        </h1>
        <h2 className="text-gray-500 mb-4">
          Visualizá costos entre proveedores <br />
        </h2>
      </div>

      <section className="flex flex-row gap-6">
        <Dashcards buttons={[
            { text: "Importado", action: changeToImported, link: "" },
          ]}
        />
        <Dashcards buttons={[
            {
              text: "Reventa", action: changeToResale, link: "",
            },
          ]}
        />
        <Dashcards buttons={[
            {
              text: "Fabrica", action: changeToFabric, link: "",
            },
          ]}
        />
        <FiltroFloat filtersConfig={filterConfig} />

      </section>
      <div className="border-t border-gray-200 mt-4">{currentComponent}</div>
    </div>
  );
};

export default Costs;
