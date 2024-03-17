
import { useSearchContext } from "../../contexts/SearchContext";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";
import { useFilterValues } from "../../contexts/FilterContext";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Dashcards from "../../components/Dashcards/Dashcards";
import { COLUMNSFABRIC, DELIVERYCOLUMNS, ERRORCOLUMNS, IMPORTEDCOLUMNS, MOVESCOLUMNS, RESALECOLUMNS, RETURNCOLUMNS } from "../../components/columns/Columns";
import { ErrorFetchNodes, MovesFetchNodes, DeliveryFetchNodes, ReturnsFetchNodes, FabricCost, ImportedCost, ResaleCost } from "../../nodes/productNodes";
import ErrorTableChart from "../../components/Tables/ErrorTableChart";
import ReturnTableChart from "../../components/Tables/ReturnTableChart";
import MoveTableChart from "../../components/Tables/MoveTableChart";
import DeliveryTableChart from "../../components/Tables/DeliveryTableChart";
import ImportedTableChart from "../../components/Tables/ImportedTableChart";
import ResaleTableChart from "../../components/Tables/ResaleTableChart";
import FabricTableChart from "../../components/Tables/FabricTableChart";

enum TableType {
  Imported,
  Resale,
  Fabric
}

const Costs = () => {

  const { products } = useSearchContext();
  const [currentTable, setCurrentTable] = useState<TableType | null>(null);
  const { categories } = useSearchContext();


  const changeTable = (tableType: TableType) => {
    setCurrentTable(tableType);
  };

  const fabricNodes = FabricCost();
  const importedNodes = ImportedCost();
  const resaleNodes = ResaleCost()
    
  const renderTable = () => {
    switch (currentTable) {
      case TableType.Imported:
        return <ImportedTableChart columns={IMPORTEDCOLUMNS} data={fabricNodes} category={categories}/>;
      case TableType.Resale:
        return <ResaleTableChart columns={RESALECOLUMNS} data={importedNodes}  category={categories}/>;
      case TableType.Fabric:
        return <FabricTableChart columns={COLUMNSFABRIC} data={fabricNodes} category={categories} />;
      default:
        return <div></div>;
    }
  };


  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen overflow-auto text-sm p-6">
      <Navbar title="Costos" subtitle="" />
      <section className="flex flex-row gap-6 pb-4 pt-4">
        <Dashcards buttons={[{ text: "Importados", action: () => changeTable(TableType.Imported), link: "" }]}/>
        <Dashcards buttons={[{ text: "Reventa", action: () => changeTable(TableType.Resale), link: ""}]}/>
        <Dashcards buttons={[{ text: "Fábrica", action: () => changeTable(TableType.Fabric), link: ""}]}/>
      </section>
      <div className="border-t border-gray-200 ">
        {renderTable()}
      </div>
    </div>
  );
};

export default Costs;
