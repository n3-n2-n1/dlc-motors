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
import OutcomesIcon from "../icon/OutcomesIcon/OutcomesIcon";
import InventoryIcon from "../icon/InventoryIcon/InventoryIcon";
import ReturnsIcon from "../icon/ReturnsIcon/ReturnsIcon";
import CostsIcon from "../icon/CostsIcon/CostsIcon";
import IncomesIcon from "../icon/IncomesIcon/IncomesIcon";

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
        <SidebarButton to={paths.categories}>
          <CategoriesIcon />
        </SidebarButton>
        <SidebarButton to={paths.outcomes}>
          <OutcomesIcon color="white" />
        </SidebarButton>
        <SidebarButton to={paths.upload}>
          <IncomesIcon color="white" />
        </SidebarButton>
        <SidebarButton to={paths.returns}>
          <ReturnsIcon color="white" />
        </SidebarButton>
        <SidebarButton to={paths.inventory}>
          <InventoryIcon color="white" />
        </SidebarButton>
        <SidebarButton to={paths.errors}>
          <ErrorsIcon />
        </SidebarButton>
        <SidebarButton to={paths.users}>
          <UsersIcon />
        </SidebarButton>
        <SidebarButton to={paths.moves}>
          <MovementsIcon />
        </SidebarButton>

        {/* <SidebarButton to={paths.notifications}>
          <NotificationsIcon />
        </SidebarButton> */}
      </div>
    </div>
  );
}

export default Sidebar;
