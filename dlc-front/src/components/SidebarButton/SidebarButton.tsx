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
      className="flex items-center px-4 h-[60px] w-full hover:bg-blue-500 dark:hover:bg-[#A9DFD8] hover:text-white dark:hover:text-white "
    >
      {children}
    </Link>
  );
}

export default SidebarButton;
