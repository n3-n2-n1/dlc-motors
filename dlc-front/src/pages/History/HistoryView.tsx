import { useSearchContext } from "../../contexts/SearchContext";
import { useState, useEffect } from "react";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import Dashcards from "../../components/Dashcards/Dashcards";
import { fetchHistorial } from "../../utils/Handlers/Handlers";
import { Historial } from "../../Interfaces/Historial";

const HistoryView = () => {
  const { products } = useSearchContext();

  const [currentComponent, setCurrentComponent] =
    useState<React.ReactNode>(null);
  const [historial, setHistorial] = useState<Historial[]>([]);

  const changeToErrors = () => setCurrentComponent(<ErrorCard />);

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
    <div className="flex flex-col bg-gray-900 bg-gray-100 bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm p-6">
      <div className="flex-row">
        <h1 className="text-4xl mb-2 text-white font-weight-300">
          Historial de Movimientos
        </h1>
        <h2 className="text-gray-500 mb-4">
          Visualizá sobre movimientos generales <br />
        </h2>
      </div>
      <section className="flex flex-row gap-6">
        <Dashcards buttons={[{ text: "Revisión de Errores", action: changeToErrors, link: "" }]}/>
        <Dashcards buttons={[{ text: "Historial de Inventario", action: changeToErrors, link: "" }]}/>
        <Dashcards buttons={[{ text: "Historial de Devoluciones", action: changeToErrors, link: "" }]}/>
      </section>
      <div className="border-t border-gray-200 mt-4">{currentComponent}</div>
    </div>
  );
};

export default HistoryView;
