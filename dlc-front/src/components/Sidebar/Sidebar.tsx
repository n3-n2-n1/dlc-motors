import SidebarButton from "../SidebarButton/SidebarButton";
import { paths } from "../../routes/paths";
import HomeIcon from "../icon/HomeIcon/HomeIcon";
import ProductsIcon from "../icon/ProductsIcon/ProductsIcon";
import MovementsIcon from "../icon/MovementsIcon/MovementsIcon";
import SearchIcon from "../icon/SearchIcon/SearchIcon";
import CategoriesIcon from "../icon/CategoriesIcon/CategoriesIcon";
import ErrorsIcon from "../icon/ErrorsIcon/ErrorsIcon";
import UsersIcon from "../icon/UsersIcon/UsersIcon";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-gray-900 border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col sm:flex ">
        <Link to={paths.home}>

      <div className="h-16 text-[#A9DFD8] flex items-center justify-center mt-2">
        <img src="/logo.svg" alt="DLC logo" className="w-16" />
      </div>
      </Link>

      {/* //Botones */}
      <div className="flex mx-auto flex-grow mt-2 flex-col text-gray-400 space-y-4">
        <SidebarButton to={paths.products}>
          <ProductsIcon />
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
        <SidebarButton to={paths.outcomes}>
          <SearchIcon color="white" />
        </SidebarButton>
        <SidebarButton to={paths.inventory}>
          <SearchIcon color="white" />
        </SidebarButton>
        <SidebarButton to={paths.upload}>
          <SearchIcon color="red" />
        </SidebarButton>
        <SidebarButton to={paths.returns}>
          <SearchIcon color="red" />
        </SidebarButton>
        {/* <SidebarButton to={paths.notifications}>
          <NotificationsIcon />
        </SidebarButton> */}
      </div>
    </div>
  );
}

export default Sidebar;
