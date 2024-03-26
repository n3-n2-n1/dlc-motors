
import { useSearchContext } from "../../contexts/SearchContext";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Dashcards from "../../components/Dashcards/Dashcards";
import { COLUMNSFABRIC, DELIVERYCOLUMNS, ERRORCOLUMNS, IMPORTEDCOLUMNS, MOVESCOLUMNS, RESALECOLUMNS, RETURNCOLUMNS } from "../../components/columns/Columns";
import ImportedTableChart from "../../components/Tables/ImportedTableChart";
import ResaleTableChart from "../../components/Tables/ResaleTableChart";
import FabricTableChart from "../../components/Tables/FabricTableChart";
import { fetchCosts } from "../../utils/Handlers/Handlers";
import PageTitle from "../../components/PageTitle/PageTitle";

enum TableType {
  Imported,
  Resale,
  Fabric
}

const Costs = () => {
  const [selectedButton, setSelectedButton] = useState<string>("");
  const { products } = useSearchContext();
  const [currentTable, setCurrentTable] = useState<TableType | null>(null);
  const { categories } = useSearchContext();
  const [importedNodes, setImportedNodes] = useState([]);
  const [fabricNodes, setFabricNodes] = useState([]);
  const [resaleNodes, setResaleNodes] = useState([]);


  const changeTable = (tableType: TableType) => {
    setCurrentTable(tableType);
    // Mueve la lógica de setSelectedButton aquí
    switch (tableType) {
      case TableType.Imported:
        setSelectedButton("Importado");
        break;
      case TableType.Resale:
        setSelectedButton("Reventa");
        break;
      case TableType.Fabric:
        setSelectedButton("Fabrica");
        break;
      default:
        setSelectedButton("");
        break;
    }
  };

  const fetchImportedData = async () => {
    try {
      const result = await fetchCosts();
      console.log("Payload data:", result.payload); // Confirma que los datos son correctos
  
      if (result.status === "success") {
        // Suponiendo que el 'rubro' viene dentro de cada objeto en el payload
        setFabricNodes(result.payload.filter(item => item.rubro === 'Fabrica'));
        setImportedNodes(result.payload.filter(item => item.rubro === 'Importado'));
        setImportedNodes(result.payload.filter(item => item.rubro === 'Nacional'));
        setResaleNodes(result.payload.filter(item => item.rubro === 'Reventa'));
      } else {
        throw new Error("La respuesta del servidor no fue de éxito.");
      }
    } catch (error) {
      console.error("Hubo un error al recuperar los datos:", error);
    }
  };
  
  useEffect(() => {
    fetchImportedData();
  }, []);
  


  console.log('aver', importedNodes)
    
  const renderTable = () => {
    switch (currentTable) {
      case TableType.Imported:
        console.log('Imported Table Data:', importedNodes);
        return <ImportedTableChart columns={IMPORTEDCOLUMNS} data={importedNodes} category={categories}/>;
      case TableType.Resale:
        console.log('Resale Table Data:', resaleNodes);
        return <ResaleTableChart columns={RESALECOLUMNS} data={resaleNodes} category={categories}/>;
      case TableType.Fabric:
        console.log('Fabric Table Data:', fabricNodes);
        return <FabricTableChart columns={COLUMNSFABRIC} data={fabricNodes} category={categories} />;
      default:
        return <div></div>;
    }
  };
  


  return (
    <>
    <PageTitle title="DLC Motors • Costos" />
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen overflow-auto text-sm p-6 transition-colors duration-300 select-none">
      <Navbar title="Costos" subtitle="" />
      <section className="flex flex-row gap-6 pb-4 pt-4 transition-colors duration-300">
        <Dashcards buttons={[{ text: "Importados", action: () => changeTable(TableType.Imported), link: "", isActive: selectedButton ==="Importado" }]}/>
        <Dashcards buttons={[{ text: "Reventa", action: () => changeTable(TableType.Resale), link: "", isActive: selectedButton ==="Reventa" }]}/>
        <Dashcards buttons={[{ text: "Fábrica", action: () => changeTable(TableType.Fabric), link: "", isActive: selectedButton ==="Fabrica" }]}/>
      </section>
      <div className="border-t border-gray-200 ">
        {renderTable()}
      </div>
    </div>
    </>

  );
};

export default Costs;
