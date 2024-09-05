import React from "react";
import NotificationBell from "../NotificationBell/NotificationBell";

interface NavbarProps {
  title: string;
  subtitle: string;
}

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">Mi Aplicación</div>
      <div className="flex items-center">
        {/* Aquí insertamos la campanita en el Navbar */}
        <NotificationBell />
      </div>
    </nav>
  );
};

export default Navbar;
