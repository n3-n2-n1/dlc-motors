import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/routes";
import { SearchProvider } from "./contexts/SearchContext";
import {useState, useEffect} from "react"
import Login from "./pages/login/login";



const App = () => {

  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    // Aquí puedes realizar la lógica para verificar si el usuario está autenticado.
    // Por ejemplo, puedes verificar la existencia de un token JWT en localStorage.
    const token = localStorage.getItem('miTokenJWT');

    if (token) {
      // Aquí puedes realizar la validación del token con tu servidor si es necesario.
      // Por ahora, simplemente estableceré la autenticación como verdadera.
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
          // Puedes redirigir a la página de inicio de sesión o mostrar un componente de inicio de sesión aquí.
          // En este ejemplo, simplemente muestro un mensaje.
          <Login />
        )}
      </Suspense>
    </SearchProvider>
  )
  )
};

export default App;
