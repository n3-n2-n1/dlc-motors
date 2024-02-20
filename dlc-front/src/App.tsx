import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/routes";
import { SearchProvider } from "./contexts/SearchContext";
import { FilterValuesProvider } from "./contexts/FilterContext";
import { useState, useEffect } from "react";
import Login from "./pages/login/login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("miTokenJWT");

    if (token) {
      setAuthenticated(true);
    } else {
      // Si no hay token, puedes dejar la autenticación como falsa o redirigir a la página de inicio de sesión.
      setAuthenticated(false);
    }
  }, []);

  const props = {};

  return (
    <SearchProvider {...(props as any)}>
      <FilterValuesProvider>
      <Suspense fallback={<Loader />}>
      <ToastContainer />
        {authenticated ? <AppRoutes /> : <Login />}
      </Suspense>
      </FilterValuesProvider>
    </SearchProvider>
  );
};

export default App;
