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
 let sidebarClasses = "bg-[#030511] border-gray-800 flex-shrink-0 border-r border-gray-200 flex-col sm:flex";

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
      <div className="h-16 text-[#A9DFD8] bg-[#030511] flex items-center justify-center p-12 hover:bg-[slate-400]">
        <img src="/logo.png" alt="DLC logo" className="w-32 p-1" />

      </div>
      </Link>

      {/* //Botones */}
      <div className="flex flex-col text-gray-400">
        <SidebarButton to={paths.products} text={"Productos"}>
          <ProductsIcon />
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
        <SidebarButton to={paths.delivery} text={"Pedidos"}>
        <MovementsIcon /> 
        <div className="ml-3 font-bold">
          Pedidos
        </div>
        </SidebarButton>
        <SidebarButton to={paths.notifications} text={"Notificaciones"}>
          <NotificationsIcon />
          <div className="ml-3 font-bold">
          Notificaciones
        </div>
        </SidebarButton>
        <button className="flex items-center px-8 h-[60px] w-full hover:bg-[#3496CB] dark:hover:bg-[#A9DFD8] hover:text-white dark:hover:text-white p-4"
        onClick={() => handleLogout()}>
          <LogoutIcon className={"w-5 h-5 text-white"}/>
          <div className="ml-2 font-bold">
            Salir
          </div>
        </button>

        {/* <SidebarButton to={paths.costs} text={"Ariana Argentati"}>
         <CostsIcon />
         <div className="ml-3">
          Ariana Argentati
        </div>
        </SidebarButton>   */}

      </div>

      
      <div className="flex pt-12">

      <button onClick={toggleSidebar} className="">
        <div className="mb-6 hover:bg-blue-60 ml-8 ">
        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        
        </div>
        </button>
      </div>

    </div>
     {!isSidebarVisible && (
      <button 
        onClick={toggleSidebar} 
        className="fixed bottom-0 right-0 mb-6 ml-4  text-white rounded-full shadow-lg"
      ><svg width="100px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z" fill="#fefefe"></path> </g></svg>
       
      </button>
    )}
    </>
  );
}
