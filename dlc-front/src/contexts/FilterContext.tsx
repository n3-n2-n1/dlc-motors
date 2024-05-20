import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextProps {}

interface FilterProviderProps {
  children: ReactNode;
}

enum TableType {
  Error,
  Return,
  Inventory,
  Delivery,
}

const FilterValuesContext = createContext<FilterContextProps | undefined>(
  undefined
);

import {
  ErrorFetchNodes,
  MovesFetchNodes,
  DeliveryFetchNodes,
  ReturnsFetchNodes,
} from "../nodes/productNodes";

export const FilterValuesProvider: React.FC<FilterProviderProps> = ({
  children,
}) => {

  const [currentTable, setCurrentTable] = useState<TableType | null>(null);

  return (
    <FilterValuesContext.Provider
      value={{currentTable, setCurrentTable}}
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
