import { useState, useEffect } from "react";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/routes";

import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import { FilterValuesProvider } from "./contexts/FilterContext";
import { NotificationsProvider } from "./contexts/NotificactionsContext";

import Loader from "./components/Loader/Loader";

import Login from "./pages/login/login";
import "react-toastify/dist/ReactToastify.css";

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
    <AuthProvider>
      <SearchProvider {...(props as any)}>
        <NotificationsProvider>
          <FilterValuesProvider>
            <Suspense fallback={<Loader />}>
              <ToastContainer />
              {authenticated ? <AppRoutes /> : <Login />}
            </Suspense>
          </FilterValuesProvider>
        </NotificationsProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
