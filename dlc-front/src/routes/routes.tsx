import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { useSearchContext } from "../contexts/SearchContext.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

import { paths } from "./paths";

import Layout from "../components/Layout/Layout";
import PublicRoute from "./components/PublicRoute.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

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

const HistoryView = lazy(() => import("../pages/History/HistoryView"));

const Scanner = lazy(() => import("../pages/Scanner/Scanner"));

const HandleFatal = lazy(() => import("../pages/404/404.tsx"));

export const IncomeObservations = [
  "Cancelación",
  "Devolución",
  "Error",
  "Fábrica",
  "Importación",
  "Compra a terceros",
  "Otro",
  "Armado de kits",
];

export const OutcomeObservations = [
  "ML",
  "FLEX",
  "FLEX G",
  "DML",
  "ML LAURA",
  "MLF",
  "TRANSFERENCIA",
  "EFECTIVO",
  "CTA CTE",
  "CAMBIO POR FALLA",
  "CAMBIO POR OTRO PRODUCTO",
  "MOTO",
  "MKP",
  "VENTA EN LOCAL",
  "OTRO",
  "ERROR",
  "Para armar kits",
];

export const ErrorsObservations = [
  "Difiere ficha de sistema",
  "Stock real diferente a ficha/sist",
  "Todo diferente",
  "Otro inconveniente	",
];

// ! Aplicar
export const ReturnsObservations = [
  "Producto distinto al enviado",
  "Roto/fallado",
  "Vuelve al stock",
  "Otro inconveniente",
];

export const DeliveriesObservations = ["Courier", "Pedido"];

export const ProductOrigins = ["Fábrica", "Nacional", "Importado"];

export const Brands = ["Volskwagen", "Ford", "Fiat", "Renault", "Citroen"];

const AppRoutes: React.FC = () => {
  const { products, categories } = useSearchContext();
  const { user } = useAuth();

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
          <Route
            path={paths.addProduct}
            element={<AddProduct categories={categories} brands={Brands} />}
          />
          <Route
            path={`${paths.editProduct}/:id`}
            element={<EditProduct categories={categories} brands={Brands} />}
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
                observationsList={IncomeObservations}
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
                observationsList={OutcomeObservations}
                products={products}
              />
            }
          />
          <Route path={paths.scanner} element={<Scanner />} />
        </Route>
      </Route>

      <Route path={paths.fatal} element={<HandleFatal />} />
      {/* <Route path={paths.delivery} element={<DeliveriesObservations/>} /> */}
    </Routes>
  );
};

export default AppRoutes;
