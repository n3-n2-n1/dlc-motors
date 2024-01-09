import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { useSearchContext } from "../../contexts/SearchContext";

interface SidebarButtonProps {
  to: string;
  children: ReactNode;
}

function SidebarButton({ to, children }: SidebarButtonProps) {
  const { setSearchResults } = useSearchContext();

  return (
    <Link
      to={to}
      onClick={() => {
        setSearchResults(null as any);
      }}
      className="flex items-center justify-center h-14 w-14 rounded-lg bg-gray-700 hover:bg-blue-500 dark:hover:bg-[#A9DFD8] hover:text-white dark:hover:text-white"
    >
      {children}
    </Link>
  );
}

export default SidebarButton;
