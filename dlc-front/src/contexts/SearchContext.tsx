import { createContext, useState, useContext, useEffect } from "react";
import { fetchProducts, getCategories } from "../utils/Handlers/Handlers";
interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
  products: any[];
  setProducts: (results: any[]) => void;
  itemsPerPage: number;
  categories: string[];
  setCategories: (categories: string[]) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const SearchProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const itemsPerPage = 17;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetchProducts();

        data = data.map((item: any) => ({
          ...item,
          kit:  item.kit === ("0" || 0) ? null : item.kit.replace(/[\[\]]/g, '').split("/").map(s => s.trim()).map(Number),
          marcasCompatibles: item.marcasCompatibles
            .split(",")
            .map((s: any) => s.trim()),
        }));
        setProducts(data);
        setSearchResults(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error al buscar el producto");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      const getCategoriesData = async () => {
        const { categorias } = await getCategories();
        setCategories(categorias.split(","));
      };
      getCategoriesData();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [products]);

  // Resetea paginación cuando se cambia el término de búsqueda
  useEffect(() => {
    if (searchResults) {
      setTotalPages(Math.ceil(searchResults.length / itemsPerPage));
    } else {
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    }
  }, [searchResults]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        itemsPerPage,
        products,
        setProducts,
        categories,
        setCategories,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
