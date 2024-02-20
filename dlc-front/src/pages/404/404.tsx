import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";

const HandleFatal = () => {
  return (
    <div className="flex justify-center items-center flex-col lg:flex-row gap-16 md:gap-28 px-4 py-24 md:px-20 md:py-20 lg:px-24 lg:py-24">
      <div className="w-full xl:w-1/2 flex flex-col items-center xl:items-start xl:pt-24 relative pb-12 lg:pb-0">
        <div className="text-center xl:text-left">
          <h1 className="text-2xl font-bold text-gray-800 my-2">Esta página no se encuentra disponible</h1>
          <p className="text-gray-800 my-2">Es posible que no tengas los permisos suficientes o esta página se haya borrado.</p>
         
        </div>
        <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="Error Image" className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg" />
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Decorative Image" className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg" />
      </div>
      <Link to={paths.home}>
          <button className="w-full sm:w-auto my-2 py-4 px-8 bg-blue-600 text-white hover:bg-blue-400 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Ir a home</button>
          </Link>
    </div>
  );
};

export default HandleFatal;
