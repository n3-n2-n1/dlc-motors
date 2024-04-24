import React from "react";

interface NavbarProps {
  title: string;
  subtitle: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-light dark:bg-dark flex flex-col sm:flex-row justify-between items-center  transition-colors duration-300 select-none">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-white">{title}</h1>
        <h2 className="text-sm sm:text-base md:text-lg  dark:text-gray-300 text-gray-400 pb-4">{subtitle}</h2>
      </div>
    </div>
  );
};

export default Navbar;
