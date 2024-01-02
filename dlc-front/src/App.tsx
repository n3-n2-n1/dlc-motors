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
    // Puedes hacer una llamada a la API para verificar la sesión del usuario.
    // Si estás utilizando tokens JWT, puedes verificar la validez del token almacenado en localStorage.
    // Por ahora, estoy simulando la autenticación después de 2 segundos.
    setTimeout(() => {
      setAuthenticated(true);
    }, 2000);
  }, []);


  return (


    (
      <SearchProvider>
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
