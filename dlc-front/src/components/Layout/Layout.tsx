import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    // EN OTRO COMPONENTE A NIVEL LAYOUT:
    // Botón CAMPANITA
    // Botón para light/dark mode
    // Botón Perfil (¿Con foto y que despliegue un menú de usuario?)
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
