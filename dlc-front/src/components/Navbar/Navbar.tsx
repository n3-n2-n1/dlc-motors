import React from "react";
import NotificationIcon from "../NotificationIcon/NotificationIcon";

interface NavbarProps {
  title: string;
  subtitle: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-dark flex flex-col sm:flex-row justify-between items-center p-2">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">{title}</h1>
        <h2 className="text-sm sm:text-base md:text-lg text-gray-250">{subtitle}</h2>
      </div>
    </div>
  );
};

export default Navbar;
