import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { paths } from "../../routes/paths";

import { useAuth } from "../../contexts/AuthContext";

import SidebarButton from "../SidebarButton/SidebarButton";

import ProductsIcon from "../icon/ProductsIcon/ProductsIcon";
import MovementsIcon, { DarkMovementsIcon } from "../icon/MovementsIcon/MovementsIcon";
import SearchIcon, { DarkSearchIcon } from "../icon/SearchIcon/SearchIcon";
import CategoriesIcon, {
  CategoriesIconDark,
} from "../icon/CategoriesIcon/CategoriesIcon";
import UsersIcon, { DarkUsersIcon } from "../icon/UsersIcon/UsersIcon";
import CostsIcon, { DarkCostsIcon } from "../icon/CostsIcon/CostsIcon";
import NotificationsIcon, { DarkNotificationsIcon } from "../icon/NotificationsIcon/NotificationsIcon";
import LogoutIcon, { DarkLogoutIcon } from "../icon/LogoutIcon/LogoutIcon";
import ThemeToggleButton from "../../utils/StyleToggle";

import DarkProductIcon from "../icon/DarkProductIcon";

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
  };

  // Clases base del sidebar
  let sidebarClasses =
    "border-gray-200 flex-shrink-0 border-r flex-col sm:flex select-none text-gray-700 transition-all ease-in-out duration-300 " +
    "bg-white dark:bg-[#030511] dark:border-gray-700 select-none text-gray-700 transition-all ease-in-out duration-300" +
    "transition-all ease-in-out duration-300";
  // Ajustar clases basadas en la visibilidad
  if (!isSidebarVisible) {
    sidebarClasses += " w-0 overflow-hidden"; // Reduce el ancho a 0 para ocultar
  } else {
    sidebarClasses += " w-30"; // Ancho original para mostrar
  }

  const sidebarStyle = {
    transitionProperty: "width", // Esto se asegura de que solo la propiedad 'width' se anime.
    transitionDuration: "300ms", // Duración de la transición en milisegundos.
    transitionTimingFunction: "ease-in-out", // La función de timing para la transición.
    width: isSidebarVisible ? "250px" : "0px", // Controlar la anchura con el estado.
    overflow: "hidden", // Asegura que el contenido no se desborde durante la animación.
  };
  return (
    <>
      <div className={sidebarClasses} style={sidebarStyle}>
        <Link to={paths.home}>
          <div className="h-16 dark:text-[#A9DFD8] text-black bg-white dark:bg-[#030511] flex items-center justify-center p-12 hover:bg-[slate-400] dark:hover:bg-[gray-600]">
            <img src="/logo.png" alt="DLC logo" className="w-32 p-1" />
          </div>
        </Link>

        {/* //Botones */}
        <div className="flex flex-col dark:text-gray-400 text-gray-700 transition-colors duration-300">
          <SidebarButton to={paths.products} text="Productos">
            <div className="text-black dark:text-white">
              <div className="dark:hidden">
                <ProductsIcon />
              </div>

              <div className="hidden dark:block">
                <DarkProductIcon />
              </div>
            </div>
            <div className="ml-3 font-bold">Productos</div>
          </SidebarButton>

          <SidebarButton to={paths.categories} text={"Rubros"}>
            <div className="text-black dark:text-white">
              
              <div className="dark:hidden">
                <CategoriesIcon />
              </div>

              <div className="hidden dark:block">
                <CategoriesIconDark />
              </div>
            
            </div>

            <div className="ml-3 font-bold">Rubros</div>
          </SidebarButton>

          <SidebarButton to={paths.users} text={"Usuarios"}>
            <div className="text-black dark:text-white">

              <div className="dark:hidden">
              <UsersIcon color="black" />

              </div>
            <div className="hidden dark:block">
              <DarkUsersIcon />
            </div>
            
            </div>

            <div className="ml-3 font-bold">Usuarios</div>
          </SidebarButton>

          <SidebarButton to={paths.costs} text={"Costos"}>
            <div className="text-black dark:text-white">

              <div className="dark:hidden">
              <CostsIcon color="black" />
              </div>

              <div className="hidden dark:block">
                <DarkCostsIcon />
              </div>
            </div>

            <div className="ml-3 font-bold">Costos</div>
          </SidebarButton>
          <SidebarButton to={paths.historyView} text={"Historial"}>
            <div className="text-black dark:text-white">

              <div className="dark:hidden">

              <SearchIcon color="black" />
              </div>

              <div className="hidden dark:block">
                <DarkSearchIcon />
              </div>
            </div>

            <div className="ml-3 font-bold">Historial</div>
          </SidebarButton>

          <SidebarButton to={paths.moves} text={"Movimientos"}>
            <div className="text-black dark:text-white">
              <div className="dark:hidden">

              <MovementsIcon color="black" />
              </div>
            
            <div className="hidden dark:block">
              <DarkMovementsIcon />
            </div>
            </div>

            <div className="ml-3 font-bold">Movimientos</div>
          </SidebarButton>

          <SidebarButton to={paths.notifications} text={"Notificaciones"}>
            <div className="text-black dark:text-white">
              <div className="dark:hidden">

              <NotificationsIcon color="black" />
              </div>
            <div className="hidden dark:block">
              <DarkNotificationsIcon/>
            </div>
            </div>

            <div className="ml-3 font-bold">Notificaciones</div>
          </SidebarButton>

          <section className="pt-12">
            <button
              className="flex items-center px-8 h-[60px] w-full hover:bg-[#3496CB] dark:hover:bg-gray-600 hover:text-white dark:hover:text-white p-4"
              onClick={() => handleLogout()}
            >
              <div className="dark:hidden">

              <LogoutIcon className="w-5 h-5 dark:text-white text-black" />
              </div>
              <div className="hidden dark:block">
                <DarkLogoutIcon />
              </div>
              <div className="ml-2 font-bold">Salir</div>
            </button>
          </section>

          <section className="p-10 px-6">
            <ThemeToggleButton />
          </section>
        </div>

        <div className="flex transition-colors duration-300 select-none">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full text-gray-700 dark:text-white"
          >
            <div className="mb-6 hover:bg-blue-60 ml-5 ">
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <section className="dark:bg-gray-900 text-gray-700 justify-center  bg-gray-100 align-middle flex hover:bg-gray-200">
        {!isSidebarVisible && (
          <button
            onClick={toggleSidebar}
            className="rotate-180 scale-20 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-900 p-1 rounded-full transition-all duration-300 hover:bg-gray-200"
          >
            <svg
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        )}
      </section>
    </>
  );
}
