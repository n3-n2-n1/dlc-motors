import React from "react";
import { Link } from "react-router-dom";

interface HotButtonProps {
  link: string;
  children: React.ReactNode;
  text: string;
  isActive: boolean;
}

const HotButton: React.FC<HotButtonProps & { onClick: () => void }> = ({
  link,
  children,
  onClick,
  isActive,
}) => {
  return (
    <Link to={link}>
      <button
        className={`flex flex-col items-center justify-center rounded-full px-4 
  transition-all duration-300 select-none 
  ${
    isActive
      ? "bg-[#225112] text-gray-300 shadow-3xl"
      : "shadow-lg hover:bg-gray-700 text-white bg-black"
  } 
  ${isActive && "dark:bg-blue-400"} 
  hover:dark:bg-blue-900 dark:bg-blue-600`}
        onClick={onClick}
      >
        <h3 className="text-m font-semibold my-2 rounded-2xl hover:text-white">
          {children}
        </h3>
      </button>
    </Link>
  );
};

export default HotButton;
