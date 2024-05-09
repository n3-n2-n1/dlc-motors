import React from "react";
import { useNavigate } from "react-router-dom";

interface HotButtonProps {
  link: string;
  children: React.ReactNode;
  isActive: boolean;
}

const HotButton: React.FC<HotButtonProps & { onClick: () => void }> = ({
  link,
  children,
  onClick,
  isActive,
}) => {
  const navigate = useNavigate();

  const baseClasses = "flex flex-col items-center justify-center rounded-full px-4 transition-all duration-300 select-none ";
  const activeClasses = "bg-[#225112] text-gray-300 shadow-3xl ";
  const inactiveClasses = "shadow-lg hover:bg-gray-700 text-white bg-black ";
  const darkModeActiveClasses = "dark:bg-blue-400 ";
  const darkModeInactiveClasses = "hover:dark:bg-blue-900 dark:bg-blue-600 ";

  const handleClick = () => {
    onClick(); // Primero actualiza el estado necesario
    navigate(link); // Luego navega
  };

  return (
    <button
      className={
        baseClasses +
        (isActive ? activeClasses : inactiveClasses) +
        (isActive ? darkModeActiveClasses : darkModeInactiveClasses)
      }
      onClick={handleClick}
    >
      <h3 className="text-m font-semibold my-2 rounded-2xl hover:text-white">
        {children}
      </h3>
    </button>
  );
};

export default HotButton;
