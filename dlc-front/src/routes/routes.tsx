import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import Layout from "../components/Layout/Layout";

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
const Management = lazy(() => import("../pages/Management/Management"))

const Ranking = lazy(() => import("../pages/Ranking/Ranking"));

const Upload = lazy(() => import("../utils/loadProducts"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.home} element={<Home />} />

        <Route path={paths.users} element={<Users />} />

        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />

        <Route path={paths.products} element={<Products />} />
        <Route path={paths.categories} element={<Categories />} />
        <Route path={paths.costs} element={<Costs />} />

        <Route path={paths.errors} element={<Errors />} />
        <Route path={paths.errors_history} element={<Errors />} />
        <Route path={paths.returns} element={<Returns />} />
        <Route path={paths.management} element = {<Management/>} />
        <Route path={paths.moves} element = {<Moves/>} />

        <Route path={paths.ranking} element={<Ranking />} />
        <Route path={paths.upload} element={<Upload />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
