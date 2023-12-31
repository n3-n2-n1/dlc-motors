import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarButtonProps {
  to: string;
  children: ReactNode;
}

function SidebarButton({ to, children }: SidebarButtonProps) {
  return (
    <Link to={to} className="flex items-center justify-center h-14 w-14 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-[#A9DFD8] hover:text-white dark:hover:text-white">
      {children}
    </Link>
  );
}

export default SidebarButton;