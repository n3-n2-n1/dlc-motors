import React from "react";

interface NavbarProps {
  title: string;
  subtitle: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl mb-2 font-semibold text-white">{title}</h1>
      <h2 className="text-lg mb-4 text-gray-600">{subtitle}</h2>
    </div>
  );
};
export default Navbar;
