import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { useSearchContext } from "../../contexts/SearchContext";

interface SidebarButtonProps {
  to: string;
  children: ReactNode;
  text: string;
}

function SidebarButton({ to, children }: SidebarButtonProps) {
  const { setSearchResults } = useSearchContext();

  return (
    <Link
      to={to}
      onClick={() => {
        setSearchResults(null as any);
      }}
      className="flex items-center px-8 h-[60px] w-full hover:bg-[#225112] hover:opacity-85 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white p-4"
    >
      {children}
    </Link>
  );
}

export default SidebarButton;
