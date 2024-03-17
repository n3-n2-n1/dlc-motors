import { createContext, useContext, useState, ReactNode } from "react";

// import { DateRange } from "react-day-picker";
// interface FilterContextProps {
//   filterValues: any;
//   setFilterValues: any;
//   applyFilters: any;
//   searchTerm: string;
//   setSearchTerm: any;
//   applyGlobalSearch: any;
//   selectedDays: DateRange | undefined;
//   setSelectedDays: any;
// }

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
  // const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedDays, setSelectedDays] = useState<DateRange | undefined>();

  // function applyFilters(data: any[], filters: Record<string, string>) {
  //   let filteredData = data;

  //   // Apply column-specific filters
  //   for (let key in filters) {
  //     if (filters[key]) {
  //       filteredData = filteredData.filter(
  //         (item) =>
  //           item.hasOwnProperty(key) &&
  //           String(item[key]).toLowerCase().includes(filters[key].toLowerCase())
  //       );
  //     }
  //   }

  //   return filteredData;
  // }

  // function applyFilters(data: any[], filters: Record<string, string>) {
  //   let filteredData = data;

  //   // Apply column-specific filters
  //   for (let key in filters) {
  //     if (filters[key]) {
  //       if (key === 'fechaInicio' || key === 'fechaFin') {
  //         const dateFilter = filters[key];
  //         filteredData = filteredData.filter((item) => {
  //           const itemDate = item.fecha.slice(0, 10);
  //           if (key === 'fechaInicio' && itemDate < dateFilter) {
  //             return false;
  //           }
  //           if (key === 'fechaFin' && itemDate > dateFilter) {
  //             return false;
  //           }
  //           return true;
  //         });
  //       } else {
  //         filteredData = filteredData.filter(
  //           (item) =>
  //             item.hasOwnProperty(key) &&
  //             String(item[key]).toLowerCase().includes(filters[key].toLowerCase())
  //         );
  //       }
  //     }
  //   }

  //   return filteredData;
  // }

  // function applyGlobalSearch(data: any[], searchTerm: string) {
  //   if (!searchTerm) {
  //     return data;
  //   }

  //   return data.filter((item) =>
  //     Object.values(item).some((value) =>
  //       (value as string)
  //         .toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //     )
  //   );
  // }

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
