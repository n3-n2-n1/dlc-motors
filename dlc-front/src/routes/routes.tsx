import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import Layout from "../components/Layout/Layout";

import { useSearchContext } from "../contexts/SearchContext.tsx";

const Home = lazy(() => import("../pages/home/Home"));
const Moves = lazy(() => import("../pages/Moves/Moves"));
const Users = lazy(() => import("../pages/users/Users"));

const Login = lazy(() => import("../pages/login/login"));
const Register = lazy(() => import("../pages/Register/Register"));

const Products = lazy(() => import("../pages/Products/Products"));
const AddProduct = lazy(() => import("../pages/Products/addProduct.tsx"));

const Categories = lazy(() => import("../pages/Categories/Categories"));
const Costs = lazy(() => import("../pages/Costs/Costs"));

const Errors = lazy(() => import("../pages/Errors/Errors"));
const Returns = lazy(() => import("../pages/Returns/Returns"));

const Inventory = lazy(() => import("../pages/Management/InventoryForm"));
const IncomesOutcomesForm = lazy(
  () => import("../pages/Management/IncomesOutcomesForm")
);

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

const ProductCategories = [
  "VENTA EN LOCAL",
  "OTRO",
  "ERROR",
  "Para armar kits",
]

const Brands = [
  "Volskwagen",
  "Ford",
  "Fiat",
  "Renault",
  "Citroen"
]

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
        <Route path={paths.addProduct} element={<AddProduct categories={ProductCategories} brands={Brands}/>} />
        <Route path={paths.categories} element={<Categories />} />

        <Route path={paths.costs} element={<Costs />} />
        <Route path={paths.returns} element={<Returns products={products} />} />
        <Route path={paths.errors} element={<Errors />} />

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
        <Route path={paths.moves} element={<Moves />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
