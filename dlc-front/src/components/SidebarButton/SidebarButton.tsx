import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { useSearchContext } from "../../contexts/SearchContext";

interface SidebarButtonProps {
  to: string;
  children: ReactNode;
  text: string;
  isActive: boolean;
}

function SidebarButton({ to, children, isActive }: SidebarButtonProps) {
  const { setSearchResults } = useSearchContext();

  const buttonClasses = `flex items-center px-8 h-[60px] w-full p-4 ${
    isActive ? "bg-[#225112] text-white" : "hover:bg-[#4370349c] hover:text-white"
  } hover:opacity-85 dark:hover:bg-gray-700 dark:hover:text-white`;

  return (
    <Link
      to={to}
      onClick={() => {
        setSearchResults(null as any);
      }}
      className={buttonClasses}
    >
      {children}
    </Link>
  );
}

export default SidebarButton;
