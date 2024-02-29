import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchContext } from "../../contexts/SearchContext";
import { useFilterValues } from "../../contexts/FilterContext";
import { useUser } from "../../contexts/UserContext";

import Dashcards from "../../components/Dashcards/Dashcards";
import {
  HistorialErrorTable,
  HistorialReturnTable,
  HistorialInventoryTable,
  HistorialDeliveryTable,
} from "../../components/TableMoves/TableMoves";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";

import { IncomeObservations, OutcomeObservations, ProductOrigins } from "../../routes/routes";
import { Brands } from "../../routes/routes";

const HistoryView = () => {
  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);
  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const { setFilterValues } = useFilterValues();
  const { products } = useSearchContext();

  const { users } = useUser();
  const userNames = users?.map((user) => user.name);
  console.log(userNames);

  useEffect(() => {
    try {
      const uniqueCategories = [...new Set(products.map(product => product.Rubro))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // const observacionFilterConfig: FilterConfig[] = [
  //   {
  //     key: "observacion",
  //     label: "Observación",
  //     type: "dropdown", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
  //     options: ["Opción 1", "Opción 2", "Opción 3"],
  //   },
  //   // ... otras configuraciones para este filtro
  // ];

  const ErrorFilterConfig: FilterConfig[] = [
    {
      key: "observacion",
      label: "Observación",
      type: "dropdown",
      options: OutcomeObservations,
    },
    {
      key: "detalle",
      label: "Detalle",
      type: "text",
    },
    {
      key: "user",
      label: "Usuario",
      type: "dropdown",
      options: userNames,
    },
    {
      key: "codigoInt",
      label: "Buscar por código interno",
      type: "text",
    },
    {
      key: "globalSearch",
      label: "Ingrese texto para buscar",
      type: "text",
    },
  ];

  const ReturnFilterConfig: FilterConfig[] = [
    {
      key: "user",
      label: "Usuario",
      type: "dropdown",
      options: userNames,
    },
    {
      key: "observacion",
      label: "Observación",
      type: "text",
    },
    {
      key: "detalle",
      label: "Buscar por detalle",
      type: "text",
    },
    {
      key: "globalSearch",
      label: "Ingrese texto para buscar",
      type: "text",
    },
  ];

  // ! Ahora esto está manejando los movimientos de inventario de INGRESO, EGRESO y DEVOLUCION
  // ! Va a traer un par de problemas para visualizar los datos con buena ux
  // ! Lo que decía ariana era que podriamos hacer un filtro obligatorio por tipo de movimiento, entonces cuando se hace click en el boton de inventario, primero te pide que selecciones el tipo de movimiento que queres ver y de ahi se va a mostrar siempre la misma tabla, pero ya podemos restringir los parametros, datos y filtros que necesitemos
  const InventoryFilterConfig: FilterConfig[] = [
    {
      key: "fecha",
      label: "Buscar por fecha",
      type: "dateRange",
    },
    {
      key: "user",
      label: "Usuario",
      type: "dropdown",
      options: userNames,
    },
    {
      key: "observacion",
      label: "Buscar por observacion",
      type: "text",
    }, // ! Problema porque hay que considerar las observaciones de cada tipo de movimiento
    {
      key: "courier",
      label: "Buscar por courier",
      type: "text",
    },
    {
      key: "movimiento",
      label: "Buscar por tipo de movimiento",
      type: "text",
    },
    {
      key: "detalle",
      label: "Buscar por detalle",
      type: "text",
    },
    {
      key: "codigoInt",
      label: "Buscar por cod interno",
      type: "text",
    },
    {
      key: "marca",
      label: "Buscar por marca",
      type: "dropdown",
      options: Brands,
    },
    {
      key: "rubro",
      label: "Buscar por rubro",
      type: "dropdown",
      options: categories,
    },
    {
      key: "origen",
      label: "Buscar por origen",
      type: "dropdown",
      options: ProductOrigins,
    },
    {
      key: "globalSearch",
      label: "Ingrese texto para buscar",
      type: "text",
    },
  ];

  const DeliveryFilterConfig: FilterConfig[] = [
    {
      key: "Fecha",
      label: "Buscar por Fecha",
      type: "text", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    },
    {
      key: "Pedido",
      label: "Buscar por numero de pedido",
      type: "text", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    },
    {
      key: "Codigo",
      label: "Buscar por codigo interno",
      type: "text", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    },
    {
      key: "globalSearch",
      label: "Ingrese texto para buscar",
      type: "text", // Asegúrate de que el valor sea exactamente "dropdown" o "text"
    },
  ];

  const changeToErrors = () => {
    setCurrentComponent(<HistorialErrorTable historialError={[]} />);
    setFilterConfig(ErrorFilterConfig);
    setFilterValues({});
  };

  const changeToReturns = () => {
    setCurrentComponent(<HistorialReturnTable historialReturn={[]} />);
    setFilterConfig(ReturnFilterConfig);
    setFilterValues({});
  };

  const changeToInventory = () => {
    setCurrentComponent(<HistorialInventoryTable historialInventory={[]} />);
    setFilterConfig(InventoryFilterConfig);
    setFilterValues({});
  };

  const changeToDelivery = () => {
    setCurrentComponent(<HistorialDeliveryTable historialDelivery={[]} />);
    setFilterConfig(DeliveryFilterConfig);
    setFilterValues({});
  };

  return (
    <div className="flex flex-col bg-gray-900 bg-gray-100 bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm p-6">
      <Navbar title= 'Historial de Movimientos' subtitle="Visualizá movimientos" />
      <section className="flex flex-row gap-6">
        <Dashcards
          buttons={[
            { text: "Revisión de Errores", action: changeToErrors, link: "" },
          ]}
        />
        <Dashcards
          buttons={[
            {
              text: "Historial de Devoluciones",
              action: changeToReturns,
              link: "",
            },
          ]}
        />
        <Dashcards
          buttons={[
            {
              text: "Historial de Inventario",
              action: changeToInventory,
              link: "",
            },
          ]}
        />
        <Dashcards
          buttons={[{ text: "Pedidos", action: changeToDelivery, link: "" }]}
        />
      </section>
      <section className="py-2">
        <FiltroFloat filtersConfig={filterConfig} />
      </section>
      <div className="border-t border-gray-200 ">{currentComponent}</div>
    </div>
  );
};

export default HistoryView;
