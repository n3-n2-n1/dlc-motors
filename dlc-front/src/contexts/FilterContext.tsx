import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextProps {}

interface FilterProviderProps {
  children: ReactNode;
}

const FilterValuesContext = createContext<FilterContextProps | undefined>(
  undefined
);

export const FilterValuesProvider: React.FC<FilterProviderProps> = ({
  children,
}) => {

  return (
    <FilterValuesContext.Provider
      value={{}}
    >
      {children}
    </FilterValuesContext.Provider>
  );
};

export const useFilterValues = () => {
  const context = useContext(FilterValuesContext);
  if (!context) {
    throw new Error(
      "useFilterValues must be used within a FilterValuesProvider"
    );
  }
  return context;
};
