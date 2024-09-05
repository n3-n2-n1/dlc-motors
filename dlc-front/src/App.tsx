import { useState, useEffect } from "react";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import '@mantine/core/styles.css';
import AppRoutes from "./routes/routes";
import './App.css'
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { SearchProvider } from "./contexts/SearchContext";
import { FilterValuesProvider } from "./contexts/FilterContext";
import { BrandsObservationsProvider } from "./contexts/BrandsObservationsContext";
import { MantineProvider } from '@mantine/core';
import Loader from "./components/Loader/Loader";

import Login from "./pages/login/login";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const props = {};

  return (
    <AuthProvider {...(props as any)}>
      <UserProvider {...(props as any)}>
        <BrandsObservationsProvider {...(props as any)}>
          <SearchProvider {...(props as any)}>
              <FilterValuesProvider>
                <Suspense fallback={<Loader />}>
                  <ToastContainer />
                  <MantineProvider theme={{ primaryShade: { light: 6, dark: 8 } }}>
                  <AppRoutes />
                </MantineProvider>
                </Suspense>
              </FilterValuesProvider>
          </SearchProvider>
        </BrandsObservationsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
