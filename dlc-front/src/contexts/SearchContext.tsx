import { createContext, useState, useContext, useEffect } from "react";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchResults: any[]; // ! TYPE
  setSearchResults: (results: any[]) => void; // ! TYPE
  products: any[]; // ! TYPE
  setProducts: (results: any[]) => void; // ! TYPE
  itemsPerPage: number;
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

  const itemsPerPage = 20;
  // useEffect para obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/productos"); // Reemplaza con la ruta correcta
        const data = await response.json();
        setProducts(data);
        setSearchResults(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        
        console.error("Error fetching products:", error);
        // Agrega lógica para manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
      
    };

    fetchProducts();
  }, []); // El array vacío significa que se ejecutará una vez al montar el componente


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
