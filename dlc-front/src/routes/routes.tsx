import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import Layout from "../components/Layout/Layout";

import { useSearchContext } from "../contexts/SearchContext.tsx";
import IncomeOutcomeForm from "../pages/Management/IncomeOutcomeForm.tsx";

const Home = lazy(() => import("../pages/home/Home"));
const Moves = lazy(() => import("../pages/Moves/Moves"));
const Users = lazy(() => import("../pages/users/Users"));

const Login = lazy(() => import("../pages/login/login"));
const Register = lazy(() => import("../pages/Register/Register"));

const Products = lazy(() => import("../pages/Products/Products"));
const Categories = lazy(() => import("../pages/Categories/Categories"));
const Costs = lazy(() => import("../pages/Costs/Costs"));

const Errors = lazy(() => import("../pages/Errors/Errors"));
const Returns = lazy(() => import("../pages/Returns/Returns"));
const Inventory = lazy(() => import("../pages/Management/InventoryForm"));

const IncomeObservations = [
  "Cancelación",
  "Devolución",
  "Error",
  "Fábrica",
  "Importación",
  "Compra a terceros",
  "Otro",
  "Armado de kits",
];

const OutcomeObservations = [
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

const AppRoutes: React.FC = () => {
  const { products } = useSearchContext();

  return (  
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />
        <Route path={paths.users} element={<Users />} />

        <Route path={paths.home} element={<Home />} />
        <Route path={paths.products} element={<Products />} />
        <Route path={paths.categories} element={<Categories />} />

        <Route path={paths.costs} element={<Costs />} />
        <Route path={paths.returns} element={<Returns />} />
        <Route path={paths.errors} element={<Errors />} />

        <Route path={paths.moves} element = {<Moves/>} />

        <Route path={paths.upload} element = {<IncomeOutcomeForm  observationsList={IncomeObservations} products={products} />} />
        <Route path={paths.inventory} element={<Inventory products={products} />} />
        <Route path={paths.outcomes} element={<IncomeOutcomeForm  observationsList={OutcomeObservations} products={products} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
