import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/routes";
import { SearchProvider } from "./contexts/SearchContext";
import {useState, useEffect} from "react"
import Login from "./pages/login/login";



const App = () => {

  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    const token = sessionStorage.getItem('miTokenJWT');

    if (token) {
      setAuthenticated(true);
    } else {
      // Si no hay token, puedes dejar la autenticación como falsa o redirigir a la página de inicio de sesión.
      setAuthenticated(false);
    }
  }, []);

  
  const props = {}


  return (


    (
      <SearchProvider {...(props as any)}>
      <Suspense fallback={<Loader />}>
        {authenticated ? (
          <AppRoutes />
        ) : (
          <Login />
        )}
      </Suspense>
    </SearchProvider>
  )
  )
};

export default App;
