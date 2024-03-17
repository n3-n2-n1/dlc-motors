import RubroChart from "../../components/Chart/RubroChart";
import CostsIcon from "../../components/icon/CostsIcon/CostsIcon";
import Horizontal from "../../components/Chart/Horizontal";
import { useAuth } from "../../contexts/AuthContext";
import ScrollNot from "../../components/Chart/ScrollNot";
import Stats from "../../components/Chart/Stats";
import { useState, useEffect } from "react";
import { fetchDelivery, fetchErrors, fetchReturns } from "../../utils/Handlers/Handlers";
import { HOMECOLUMNS, MOVESCOLUMNS } from "../../components/columns/Columns";
import { DeliveryFetchNodes, MovesFetchNodes } from "../../nodes/productNodes";
import { MantineTheme } from "@mantine/core";
function Home() {
  const [saleStats, setSaleStats] = useState([]);
  const [returnStats, setReturnStats] = useState([]);
  const [errorStats, setErrorStats] = useState([]);
  const [deliveryStats, setDeliveryStats] = useState([]);
  const handle = () => { };
  const { user } = useAuth();



  useEffect(() => {
    // Función asíncrona para obtener los datos
    const fetchReturnData = async () => {
      try {
        const response = await fetchReturns();
        // Aquí asumimos que 'data' es un arreglo con valores y porcentajes
        console.log(response.payload)
        setReturnStats(response.payload); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchDeliveryData = async () => {
      try {
        const response = await fetchDelivery()
        setDeliveryStats(response.payload)
      } catch (error) {
        console.error("Error fetching", error)
      }
    };

    const fetchErrorData = async () => {
      try {
        const response = await fetchErrors();
        console.log(response);
        console.log("LO DE ARRIBA");

        setErrorStats(response.payload)
        console.log(errorStats?.length);

      } catch (error) {
        console.error("Error fetching", error)
      }
    };

    const fetchSaleData = async () => {
      try {
        const response = await fetchErrors();
        setSaleStats(response.payload)
      } catch (error) {
        console.error("Error fetching", error)
      }
    }



    fetchReturnData();
    fetchDeliveryData();
    fetchErrorData();
    fetchSaleData();
  }, []); // El array vacío asegura que el efecto se ejecute una sola vez




  const baseStats = [
    { title: "Ventas Totales", icon: <CostsIcon />, percentage: 5, value: saleStats?.length },
    { title: "Devoluciones", icon: <CostsIcon />, percentage: 5, value: returnStats?.length },
    { title: "Errores", icon: <CostsIcon />, percentage: 5, value: errorStats.length },
    { title: "En camino:", icon: <CostsIcon />, percentage: 5, value: deliveryStats?.length }
  ]
  const deliveryNodes = MovesFetchNodes();
  console.log('NODOESS', deliveryNodes)

  console.log(baseStats)
  return (
    <main className="bg-gray-100 dark:bg-gray-900 sm:p-6 space-y-6 xl:w-768 w-full flex-shrink-0 border-r dark:border-gray-800 h-screen overflow-y-auto lg:block">
      <div className="text-gray-900 dark:text-white text-2xl">
        <span>Bienvenido, {user?.name} | Vista General</span>
      </div>
      <section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {baseStats.map((data, index) => (
            <Stats key={index} title={data.title} value={data.value} percentage={data.percentage} icon={data.icon} />
          ))}
        </div>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        <section className="flex flex-row dark:text-white">
          <div className="">
            <RubroChart />
          </div>
        </section>
        <section className="flex flex-row p-4 gap-5 text-gray-700 bg-gray-100 dark:bg-gray-700 rounded-xl">
          <Horizontal />
        </section>
      </section>
      <section>
        <div className="overflow-hidden rounded-xl">
          <div className="">
            <ScrollNot columns={HOMECOLUMNS} data={deliveryNodes} />
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </main>
  );
}

export default Home;
