import SidebarButton from "../SidebarButton/SidebarButton";
import { paths } from "../../routes/paths";
import HomeIcon from "../icon/HomeIcon/HomeIcon";
import ProductsIcon from "../icon/ProductsIcon/ProductsIcon";
import MovementsIcon from "../icon/MovementsIcon/MovementsIcon";
import SearchIcon from "../icon/SearchIcon/SearchIcon";
import CategoriesIcon from "../icon/CategoriesIcon/CategoriesIcon";
import ErrorsIcon from "../icon/ErrorsIcon/ErrorsIcon";
import UsersIcon from "../icon/UsersIcon/UsersIcon";

function Sidebar() {
  return (
    <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col sm:flex">
      <div className="h-16 text-blue-500 flex items-center justify-center">
        <img src="/logo.png" alt="DLC logo" className="w-16" />
      </div>
      {/* //Botones */}
      <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
        <SidebarButton to={paths.home}>
          <HomeIcon />
        </SidebarButton>
        <SidebarButton to={paths.products}>
          <ProductsIcon />
        </SidebarButton>
        <SidebarButton to={paths.management}>
          <MovementsIcon />
        </SidebarButton>
        <SidebarButton to={paths.errors}>
          <ErrorsIcon />
        </SidebarButton>
        <SidebarButton to={paths.categories}>
          <CategoriesIcon />
        </SidebarButton>
        <SidebarButton to={paths.users}>
          <UsersIcon />
        </SidebarButton>
        <SidebarButton to={paths.users}>
          <SearchIcon color="white" />
        </SidebarButton>
        {/* <SidebarButton to={paths.notifications}>
          <NotificationsIcon />
        </SidebarButton> */}
      </div>
    </div>
  );
}

export default Sidebar;
