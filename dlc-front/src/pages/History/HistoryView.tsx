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
enum TableType {
  Error,
  Return,
  Inventory,
  Delivery,
}

import { useAuth } from "../../contexts/AuthContext";
import useRoleCheck from "../../hooks/useRoleCheck";

const HistoryView = () => {
  const [currentTable, setCurrentTable] = useState<TableType | null>(null);

  const [selectedButton, setSelectedButton] = useState<string>("");

  const { user } = useAuth();

  const isSalesMan = useRoleCheck(user?.role, ["Vendedor"]);
  const isDepositOperator = useRoleCheck(user?.role, ["Operador de depósito"]);
  const isFactoryOperator = useRoleCheck(user?.role, ["Operador de fábrica"]);

  const changeTable = (tableType: TableType) => {
    setCurrentTable(tableType);
    switch (tableType) {
      case TableType.Error:
        setSelectedButton("Errores");
        break;
      case TableType.Return:
        setSelectedButton("Devoluciones");
        break;
      case TableType.Inventory:
        setSelectedButton("Movimientos");
        break;
      case TableType.Delivery:
        setSelectedButton("Pedidos");
        break;
      default:
        setSelectedButton("");
    }
  };

  const errorNodes = ErrorFetchNodes();
  const movesNodes = MovesFetchNodes();
  const returnNodes = ReturnsFetchNodes();
  const deliveryNodes = DeliveryFetchNodes();

  const renderTable = () => {
    switch (currentTable) {
      case TableType.Error:
        return <ErrorTableChart columns={ERRORCOLUMNS} data={errorNodes} />;
      case TableType.Return:
        return <ReturnTableChart columns={RETURNCOLUMNS} data={returnNodes} />;
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
          {!isFactoryOperator && (
            <Dashcards
              buttons={[
                {
                  text: "Revisión de Errores",
                  action: () => changeTable(TableType.Error),
                  link: "",
                  isActive: selectedButton === "Errores",
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
                  isActive: selectedButton === "Devoluciones",
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
                isActive: selectedButton === "Movimientos",
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
