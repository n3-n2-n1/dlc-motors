import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/routes";
import { SearchProvider } from "./contexts/SearchContext";
const App = () => {
  return (

    //Hay que arreglar el search provider que pide un children de alla pero aca tambien, si lo declaras sobreescribe lo que le pasas u.u**// 
    <SearchProvider>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </SearchProvider>
  );
};

export default App;
