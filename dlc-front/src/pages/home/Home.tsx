import ProfileActions from "../../components/ProfileActions/ProfileActions";
import Dashcards from "../../components/Dashcards/Dashcards";
import ProductChart from "../../components/Chart/FinalChart";
import RubroChart2 from "../../components/Chart/RubroChart2";
import Footer from "../../components/Footer/Footer";
import {MyClass} from '../../components/Chart/Chart2';

function Home() {

  const handle = () => {};
  
  
  return (
    <main className="bg-gray-900 sm:p-6 space-y-6 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 border-gray-800 h-screen overflow-y-auto lg:block hidden">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            DLC MOTORS
          </h1>
          <h2 className="text-gray-300 ml-0.5">Gestión Íntegra de Productos</h2>
        </div>
        <div className="justify-center">
          <div className="mt-6">
            <ProfileActions />
          </div>
        </div>
      </div>
      <section className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">

      <MyClass />
      <MyClass />
      </section>
      
      <section className="flex flex-row p-2 justify-center gap-[18rem] font-white">
        <div className="flex flex-col">
        <ProductChart/>
        </div>
        <div>

        <RubroChart2 />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
