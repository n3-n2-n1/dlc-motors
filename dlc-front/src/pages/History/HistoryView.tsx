import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Dashcards from "../../components/Dashcards/Dashcards";
import {
  DELIVERYCOLUMNS,
  ERRORCOLUMNS,
  MOVESCOLUMNS,
  RETURNCOLUMNS,
} from "../../components/columns/Columns";
import {
  ErrorFetchNodes,
  MovesFetchNodes,
  DeliveryFetchNodes,
  ReturnsFetchNodes,
} from "../../nodes/productNodes";
import ErrorTableChart from "../../components/Tables/ErrorTableChart";
import ReturnTableChart from "../../components/Tables/ReturnTableChart";
import MoveTableChart from "../../components/Tables/MoveTableChart";
import DeliveryTableChart from "../../components/Tables/DeliveryTableChart";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useParams, useNavigate } from 'react-router-dom';



enum TableType {
  Error,
  Return,
  Inventory,
  Delivery,
}

import { useFilterValues } from "../../contexts/FilterContext";

import { useAuth } from "../../contexts/AuthContext";
import useRoleCheck from "../../hooks/useRoleCheck";

const HistoryView = () => {

  const { user } = useAuth();
  const { currentTable, setCurrentTable } = useFilterValues();
  const { category } = useParams();

  const isSalesMan = useRoleCheck(user?.role, ["Vendedor"]);
  const isDepositOperator = useRoleCheck(user?.role, ["Operador de depósito"]);
  const isFactoryOperator = useRoleCheck(user?.role, ["Operador de fábrica"]);
  // const [currentTable, setCurrentTable] = useState<TableType | null>(null);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { tableType } = useParams<{ tableType?: string }>();
  const navigate = useNavigate();

  const buttonLabels: Record<TableType, string> = {
  [TableType.Error]: "Revisión de Errores",
  [TableType.Return]: "Historial de Devoluciones",
  [TableType.Inventory]: "Historial de Movimientos",
  [TableType.Delivery]: "Pedidos",
};

  // Mapa de funciones de carga de datos
  const dataFetchFunctions = {
    [TableType.Error]: ErrorFetchNodes,
    [TableType.Return]: ReturnsFetchNodes,
    [TableType.Inventory]: MovesFetchNodes,
    [TableType.Delivery]: DeliveryFetchNodes, 
  };

  useEffect(() => {
    const type = tableType as keyof typeof TableType;
    const validType = TableType[type];
    if (validType !== undefined) {
      changeTable(validType);
    } else {
      navigate("/historyView", { replace: true });
    }
  }, [tableType, navigate]);

  const changeTable = async (tableType: TableType) => {
    setLoading(true);
    setCurrentTable(tableType);
    const selectedButtonLabel = buttonLabels[tableType];
    setSelectedButton(selectedButtonLabel);
    try {
      // Llamando a la función de carga de datos correspondiente
      const fetchData = dataFetchFunctions[tableType];
      if (fetchData) {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } else {
        setData([]);
        console.error("No fetch function available for this table type.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
    setLoading(false);
  };
  


  const errorNodes = ErrorFetchNodes();
  const movesNodes = MovesFetchNodes();
  const returnNodes = ReturnsFetchNodes();
  const deliveryNodes = DeliveryFetchNodes();

  const renderTable = () => {
    switch (currentTable) {
      case TableType.Error:
        return <ErrorTableChart columns={ERRORCOLUMNS} data={errorNodes} category={category} />;
      case TableType.Return:
        return <ReturnTableChart columns={RETURNCOLUMNS} data={returnNodes}  />;
      case TableType.Inventory:
        return <MoveTableChart columns={MOVESCOLUMNS} data={movesNodes} />;
      case TableType.Delivery:
        return (
          <DeliveryTableChart columns={DELIVERYCOLUMNS} data={deliveryNodes} />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <PageTitle title="DLC Motors • Historial" />

      <div className="flex flex-col bg-gray-100 dark:text-white text-gray-600 h-screen overflow-auto text-sm p-6 dark:bg-gray-900 transition-colors duration-300 select-none">
        <Navbar title="Historial" subtitle="" />
        <section className="flex flex-row gap-6 pb-4 pt-4">
          {!isFactoryOperator && !isSalesMan && (
            <Dashcards
              buttons={[
                {
                  text: "Revisión de Errores",
                  action: () => changeTable(TableType.Error),
                  link: "",
                  isActive: selectedButton === "Revisión de Errores",
                },
              ]}
            />
          )}
          {!isFactoryOperator && !isDepositOperator && (
            <Dashcards
              buttons={[
                {
                  text: "Historial de Devoluciones",
                  action: () => changeTable(TableType.Return),
                  link: "",
                  isActive: selectedButton === "Historial de Devoluciones",
                },
              ]}
            />
          )}
          {!isFactoryOperator && (
            <Dashcards
              buttons={[
                {
                  text: "Pedidos",
                  action: () => changeTable(TableType.Delivery),
                  link: "",
                  isActive: selectedButton === "Pedidos",
                },
              ]}
            />
          )}
          <Dashcards
            buttons={[
              {
                text: "Historial de Movimientos",
                action: () => changeTable(TableType.Inventory),
                link: "",
                isActive: selectedButton === "Historial de Movimientos",
              },
            ]}
          />
        </section>
        <div className="border-t border-gray-200 ">{renderTable()}</div>
      </div>
    </>
  );
};

export default HistoryView;
