import RubroChart from "../../components/Chart/RubroChart";
import CostsIcon from "../../components/icon/CostsIcon/CostsIcon";
import Horizontal from "../../components/Chart/Horizontal";
import { useAuth } from "../../contexts/AuthContext";
import ScrollNot from "../../components/Chart/ScrollNot";
import Stats from "../../components/Chart/Stats";
import { useState, useEffect } from "react";
import {
  fetchDelivery,
  fetchErrors,
  fetchMoves,
  fetchReturns,
} from "../../utils/Handlers/Handlers";
import { HOMECOLUMNS, MOVESCOLUMNS } from "../../components/columns/Columns";
import Loader from "../../components/Loader/Loader";
import { paths } from "../../routes/paths";
import PageTitle from "../../components/PageTitle/PageTitle";

function Home() {
  const [saleStats, setSaleStats] = useState([]);
  const [returnStats, setReturnStats] = useState([]);
  const [errorStats, setErrorStats] = useState([]);
  const [deliveryStats, setDeliveryStats] = useState([]);
  const handle = () => {};
  const { user } = useAuth();

  useEffect(() => {
    // Función asíncrona para obtener los datos
    const fetchReturnData = async () => {
      try {
        const response = await fetchReturns();
        setReturnStats(response.payload); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchDeliveryData = async () => {
      try {
        const response = await fetchDelivery();
        setDeliveryStats(response.payload);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };

    const fetchErrorData = async () => {
      try {
        const response = await fetchErrors();
        setErrorStats(response.payload);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };

    const fetchSaleData = async () => {
      try {
        const response = await fetchMoves();
        setSaleStats(response.payload);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };

    fetchReturnData();
    fetchDeliveryData();
    fetchErrorData();
    fetchSaleData();
  }, []); // El array vacío asegura que el efecto se ejecute una sola vez

  const baseStats = [
    {
      title: "Ventas Totales",
      icon: <CostsIcon />,
      percentage: 95,
      value: saleStats?.length,
      path: paths.costs,
    },
    {
      title: "Devoluciones",
      icon: <CostsIcon />,
      percentage: 51,
      value: returnStats?.length,
      path: paths.historyView,
    },
    {
      title: "Errores",
      icon: <CostsIcon />,
      percentage: 25,
      value: errorStats.length,
      path: paths.historyView,
    },
    {
      title: "En camino:",
      icon: <CostsIcon />,
      percentage: 65,
      value: deliveryStats?.length,
      path: paths.historyView,
    },
  ];

  const [moveNodes, setMoveNodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el control de carga

  useEffect(() => {
    setIsLoading(true);

    const fetchMovesData = async () => {
      try {
        const result = await fetchMoves();

        if (result.status === "success") {
          // Suponiendo que el 'rubro' viene dentro de cada objeto en el payload
          setMoveNodes(result.payload);
          setIsLoading(false);
        } else {
          throw new Error("La respuesta del servidor no fue de éxito.");
        }
      } catch (error) {
        console.error("Hubo un error al recuperar los datos:", error);
      }
    };

    fetchMovesData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Muestra esto mientras isLoading sea true
  }

  return (
    <>
      <PageTitle title="DLC Motors • Inicio" />

      <main className="transition-colors duration-300 bg-gray-100 dark:bg-gray-900 sm:p-6 space-y-6 xl:w-768 w-full flex-shrink-0 border-r dark:border-gray-800 h-screen overflow-y-auto lg:block select-none">
        <div className="text-gray-900 font-semibold dark:text-white text-xl flex items-center flex-grow gap-3">
          <div className="text-gray-900 font-semibold dark:text-[#CDFF71] text-xl flex items-center">
            <svg
              width="20"
              className="blink-svg"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99609 1.68262C8.99275 1.68262 7.99509 1.81147 7.05535 2.07806"
                stroke="currentColor"
                strokeWidth="2.03488"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.51724 18.5897V9.44779C1.51724 7.21419 2.23179 5.50116 3.37305 4.25977"
                stroke="currentColor"
                strokeWidth="2.03488"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.4728 18.5899V10.9135M9.99414 1.68457C13.6398 1.68457 17.2104 3.38524 18.2023 7.21218"
                stroke="currentColor"
                strokeWidth="2.03488"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.39471 18.5905C6.39471 18.5905 5.9401 17.1579 5.59913 15.0844M13.5979 18.5905C13.5979 18.5905 14.7617 14.923 14.7617 10.8305C14.7617 10.0302 14.6584 9.35033 14.4767 8.77441"
                stroke="currentColor"
                strokeWidth="2.03488"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.99414 16.1357V17.4908"
                stroke="currentColor"
                strokeWidth="2.03488"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.23208 10.8304C5.23208 6.73788 7.9344 5.79492 9.99752 5.79492C10.6092 5.79492 11.2771 5.87781 11.9141 6.10111"
                stroke="currentColor"
                strokeWidth="2.03488"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.40281 12.1914C8.40281 10.9194 9.11625 10.2272 9.99633 10.2272C10.8764 10.2272 11.5898 10.9194 11.5898 12.1914"
                stroke="currentColor"
                strokeWidth="2.03488"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span>Bienvenido, {user?.name}</span>
        </div>
        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {baseStats.map((data, index) => (
              <Stats
                key={index}
                title={data.title}
                value={data.value}
                percentage={data.percentage}
                icon={data.icon}
                link={''}
              />
            ))}
          </div>
        </section>

            <Horizontal />
        {/* <Footer /> */}
      </main>
    </>
  );
}

export default Home;
