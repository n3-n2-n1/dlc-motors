import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { paths } from "../../routes/paths";

import { useAuth } from "../../contexts/AuthContext";

import SidebarButton from "../SidebarButton/SidebarButton";

import ProductsIcon from "../icon/ProductsIcon/ProductsIcon";
import MovementsIcon from "../icon/MovementsIcon/MovementsIcon";
import SearchIcon from "../icon/SearchIcon/SearchIcon";
import CategoriesIcon from "../icon/CategoriesIcon/CategoriesIcon";
import UsersIcon from "../icon/UsersIcon/UsersIcon";
import CostsIcon from "../icon/CostsIcon/CostsIcon";
import NotificationsIcon from "../icon/NotificationsIcon/NotificationsIcon";
import LogoutIcon from "../icon/LogoutIcon/LogoutIcon";
import ThemeToggleButton from "../../utils/StyleToggle";


export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = async () => {
    try {
      await toast.promise(logout(), {
        pending: "Cerrando sesión... 🕒",
        success: {
          render: "Sesión cerrada correctamente, adios! 👋",
          autoClose: 1000,
          onClose: () => {
            navigate("/login");
          },
        },
        error: "Error al cerrar la sesión, intenta nuevamente 🤯",
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

 // Clases base del sidebar
 let sidebarClasses = "border-gray-200 flex-shrink-0 border-r flex-col sm:flex " +
 "bg-white dark:bg-[#030511] dark:border-gray-700";

 // Ajustar clases basadas en la visibilidad
 if (!isSidebarVisible) {
   sidebarClasses += " w-0"; // Reduce el ancho a 0 para ocultar
 } else {
   sidebarClasses += " w-30"; // Ancho original para mostrar
 }
  return (
    <>
    <div className={sidebarClasses}>
      <Link to={paths.home}>
      <div className="h-16 dark:text-[#A9DFD8] text-black bg-white dark:bg-[#030511] flex items-center justify-center p-12 hover:bg-[slate-400] dark:hover:bg-[slate-500]">
        <img src="/logo.png" alt="DLC logo" className="w-32 p-1" />

      </div>
      </Link>

      {/* //Botones */}
      <div className="flex flex-col dark:text-gray-400 text-gray-700">
        <SidebarButton to={paths.products} text={"Productos"} >
          <ProductsIcon color=""/>
          <div className="ml-3 font-bold">
          Productos
        </div>
        </SidebarButton>
        <SidebarButton to={paths.categories} text={"Rubros"}>
          <CategoriesIcon />
          <div className="ml-3 font-bold">
          Rubros
        </div>
        </SidebarButton>
        <SidebarButton to={paths.users} text={"Usuarios"}>
         <UsersIcon /> 
         <div className="ml-3 font-bold">
          Usuarios
        </div>
        </SidebarButton> 
       
        <SidebarButton to={paths.costs} text={"Costos"}>
         <CostsIcon />
         <div className="ml-3 font-bold">
          Costos
        </div>
        </SidebarButton>
        <SidebarButton to={paths.historyView} text={"Historial"}>
        <SearchIcon /> 
        <div className="ml-3 font-bold">
          Historial
        </div>
        </SidebarButton>
        <SidebarButton to={paths.moves} text={"Movimientos"}>
        <MovementsIcon /> 
        <div className="ml-3 font-bold">
          Movimientos
        </div>
        </SidebarButton>

        <SidebarButton to={paths.notifications} text={"Notificaciones"}>
          <NotificationsIcon />
          <div className="ml-3 font-bold">
          Notificaciones
        </div>
        </SidebarButton>
        
        <section className="pt-12">

        <button className="flex items-center px-8 h-[60px] w-full hover:bg-[#3496CB] dark:hover:bg-[#A9DFD8] hover:text-white dark:hover:text-white p-4"
        onClick={() => handleLogout()}>
          <LogoutIcon className="w-5 h-5 dark:text-white text-black" />
          <div className="ml-2 font-bold">
            Salir
          </div>
        </button>
          </section>

          <section className="p-10 px-6">
            <ThemeToggleButton />
          </section>

        {/* <SidebarButton to={paths.costs} text={"Ariana Argentati"}>
         <CostsIcon />
         <div className="ml-3">
          Ariana Argentati
        </div>
        </SidebarButton>   */}

      </div>

      
      <div className="flex pt-12">

      <button onClick={toggleSidebar} className="p-1 rounded-full">
        <div className="mb-6 hover:bg-blue-60 ml-8 ">
        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        </button>
      </div>

    </div>
     {!isSidebarVisible && (
      <button onClick={toggleSidebar} className="fixed bottom-0 left-0 mb-6 ml-4 rotate-180 text-white bg-[#030511]/70 dark:bg-gray-700 p-1 rounded-full">
        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </button>
    )}
    </>
  );
}
