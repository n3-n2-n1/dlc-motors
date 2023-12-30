import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/routes";

import { SearchProvider } from "./contexts/SearchContext";

const App = () => {
  return (
    <SearchProvider>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </SearchProvider>
  );
};

export default App;
