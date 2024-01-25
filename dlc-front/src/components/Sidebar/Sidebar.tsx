import SidebarButton from "../SidebarButton/SidebarButton";
import { paths } from "../../routes/paths";
import HomeIcon from "../icon/HomeIcon/HomeIcon";
import ProductsIcon from "../icon/ProductsIcon/ProductsIcon";
import MovementsIcon from "../icon/MovementsIcon/MovementsIcon";
import SearchIcon from "../icon/SearchIcon/SearchIcon";
import CategoriesIcon from "../icon/CategoriesIcon/CategoriesIcon";
import ErrorsIcon from "../icon/ErrorsIcon/ErrorsIcon";
import UsersIcon from "../icon/UsersIcon/UsersIcon";
import { Link } from "react-router-dom";
import OutcomesIcon from "../icon/OutcomesIcon/OutcomesIcon";
import InventoryIcon from "../icon/InventoryIcon/InventoryIcon";
import ReturnsIcon from "../icon/ReturnsIcon/ReturnsIcon";
import CostsIcon from "../icon/CostsIcon/CostsIcon";
import IncomesIcon from "../icon/IncomesIcon/IncomesIcon";
import { useState } from "react";
import Notifications from "../../pages/Notifications/Notifications";
import NotificationsIcon from "../icon/NotificationsIcon/NotificationsIcon";


export default function Sidebar() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

 // Clases base del sidebar
 let sidebarClasses = "bg-gray-900 border-gray-800 flex-shrink-0 border-r border-gray-200 flex-col sm:flex";

 // Ajustar clases basadas en la visibilidad
 if (!isSidebarVisible) {
   sidebarClasses += " w-0"; // Reduce el ancho a 0 para ocultar
 } else {
   sidebarClasses += " w-20"; // Ancho original para mostrar
 }
  return (
    <>
    <div className={sidebarClasses}>
      <Link to={paths.home}>
      <div className="h-16 text-[#A9DFD8] flex items-center justify-center mt-2">
        <img src="/logo.svg" alt="DLC logo" className="w-16" />
      </div>
      </Link>

      {/* //Botones */}
      <div className="flex mx-auto flex-grow mt-2 flex-col text-gray-400 space-y-4">
        <SidebarButton to={paths.products}>
          <ProductsIcon />
        </SidebarButton>
        <SidebarButton to={paths.categories}>
          <CategoriesIcon />
        </SidebarButton>
        <SidebarButton to={paths.users}>
          <UsersIcon />
        </SidebarButton>
        <SidebarButton to={paths.moves}>
          <MovementsIcon />
        </SidebarButton>
        <SidebarButton to={paths.notifications}>
          <NotificationsIcon color="white"/>
        </SidebarButton>
        <SidebarButton to={paths.historyView}>
          <SearchIcon color="white"/>
        </SidebarButton>
        
        <button onClick={toggleSidebar} className="hover:bg-blue-600 rounded-full justify-center pl-3">
        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        
        {/* <SidebarButton to={paths.notifications}>
          <NotificationsIcon />
        </SidebarButton> */}
      </div>

    </div>
     {!isSidebarVisible && (
      <button 
        onClick={toggleSidebar} 
        className="fixed bottom-0 left-0 mb-4 ml-4 p-6 bg-white text-white rounded-full shadow-lg hover:bg-blue-600"
      >
        {/* Icono o texto para el botón */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </button>
    )}
    </>
  );
}
