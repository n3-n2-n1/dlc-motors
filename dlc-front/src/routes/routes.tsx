import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { useSearchContext } from "../contexts/SearchContext.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useBrandsObservations } from "../contexts/BrandsObservationsContext.tsx";

import { paths } from "./paths";

import Layout from "../components/Layout/Layout";
import PublicRoute from "./components/PublicRoute.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import Loader from "../components/Loader/Loader";
import DeliveryMassive from "../pages/Massive/DeliveryMassiveAdd.tsx";

const Home = lazy(() => import("../pages/home/Home"));
const Moves = lazy(() => import("../pages/Moves/Moves"));

const Login = lazy(() => import("../pages/login/login"));
const Users = lazy(() => import("../pages/users/Users"));

const Products = lazy(() => import("../pages/Products/Products"));
const AddProduct = lazy(() => import("../pages/Products/addProduct.tsx"));
const EditProduct = lazy(() => import("../pages/Products/editProduct.tsx"));

const Categories = lazy(() => import("../pages/Categories/Categories"));
const Costs = lazy(() => import("../pages/Costs/Costs"));

const Errors = lazy(() => import("../pages/Errors/Errors"));
const Returns = lazy(() => import("../pages/Returns/Returns"));

const Inventory = lazy(() => import("../pages/Management/InventoryForm"));
const IncomesOutcomesForm = lazy(
  () => import("../pages/Management/IncomesOutcomesForm")
);

const Notifications = lazy(
  () => import("../pages/Notifications/Notifications")
);

const MassiveAdd = lazy(() => import("../pages/Massive/MasiveAdd"));

const HistoryView = lazy(() => import("../pages/History/HistoryView"));

const HandleFatal = lazy(() => import("../pages/404/404.tsx"));

export const DeliveriesObservations = ["Courier", "Pedido"];
export const ProductOrigins = ["Fábrica", "Nacional", "Importado"];
export const MovementTypes = ["Ingreso", "Egreso", "Inventario"];

const AppRoutes: React.FC = () => {
  const { products, categories } = useSearchContext();
  const { user, loading } = useAuth();
  const { brands, incomesObservations, outcomesObservations } =
    useBrandsObservations();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route element={<PublicRoute user={user} />}>
        <Route path={paths.login} element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute redirectPath="/login" user={user} />}>
        <Route element={<Layout />}>
          <Route path={paths.users} element={<Users />} />
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.products} element={<Products />} />
          <Route path={`${paths.products}/:category`} element={<Products />} />
          <Route path={paths.massive} element={<MassiveAdd />} />
          <Route path={paths.massiveDelivery} element={<DeliveryMassive />} />
          <Route
            path={paths.addProduct}
            element={<AddProduct categories={categories} brands={brands} />}
          />
          <Route
            path={`${paths.editProduct}/:id`}
            element={<EditProduct categories={categories} brands={brands} />}
          />
          <Route path={paths.categories} element={<Categories />} />
          <Route path={paths.costs} element={<Costs />} />
          <Route
            path={paths.returns}
            element={<Returns products={products} />}
          />
          <Route path={paths.errors} element={<Errors />} />
          <Route path={paths.moves} element={<Moves />} />
          <Route path={paths.notifications} element={<Notifications />} />
          <Route path={paths.historyView} element={<HistoryView />} />
          <Route
            path={paths.upload}
            element={
              <IncomesOutcomesForm
                formName={"Ingreso"}
                observationsList={incomesObservations}
                products={products}
              />
            }
          />
          <Route
            path={paths.inventory}
            element={<Inventory products={products} />}
          />
          <Route
            path={paths.outcomes}
            element={
              <IncomesOutcomesForm
                formName={"Egreso"}
                observationsList={outcomesObservations}
                products={products}
              />
            }
          />
        </Route>
      </Route>

      <Route path={paths.fatal} element={<HandleFatal />} />
      {/* <Route path={paths.delivery} element={<DeliveriesObservations/>} /> */}
    </Routes>
  );
};

export default AppRoutes;
