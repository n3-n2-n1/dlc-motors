import ProfileActions from "../../components/ProfileActions/ProfileActions";
import Dashcards from "../../components/Dashcards/Dashcards";
import RubroChart2 from "../../components/Chart/RubroChart2";
import Footer from "../../components/Footer/Footer";
import RubroChart from "../../components/Chart/RubroChart";
import { HistorialErrorTable } from "../../components/TableMoves/TableMoves";
import { HistorialInventoryTable } from "../../components/TableMoves/TableMoves";
import CostsIcon from "../../components/icon/CostsIcon/CostsIcon";
import Horizontal from "../../components/Chart/Horizontal";
import { useAuth } from "../../contexts/AuthContext";
import ScrollNot from "../../components/Chart/ScrollNot";
import Stats from "../../components/Chart/Stats";



const statsData = [
  { title: "Ventas Totales", value: "100,221", percentage: 14, icon: <CostsIcon /> },
  { title: "Devoluciones", value: "3,400", percentage: -5, icon: <CostsIcon/> },
  { title: "Errores", value: "$240,000", percentage: 9, icon: <CostsIcon /> },
  { title: "En camino:", value: "1,921", percentage: 20, icon: <CostsIcon /> }
];

function Home() {
  const handle = () => {};
  const { user } = useAuth();

  return (
    <main className="bg-gray-900 sm:p-6 space-y-6 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 border-gray-800 h-screen overflow-y-auto lg:block hidden">
      <div className="text-white text-2xl">
        <span>Bienvenido, {user?.name} | Vista General</span>
      </div>
      <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((data, index) => (
          <Stats key={index} title={data.title} value={data.value} percentage={data.percentage} icon={data.icon} />
        ))}
      </div>
    </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      <section className="flex flex-row font-white">
        <div className="">
          <RubroChart />
        </div>
      </section>
        <div className="overflow-hidden">
          <div className="">
            <ScrollNot />
          </div>
        </div>
      </section>
      <section className="flex flex-row p-4 gap-5 font-white bg-gray-700">
       <Horizontal />
      </section>
      {/* 
      <Footer /> */}
    </main>
  );
}

export default Home;
