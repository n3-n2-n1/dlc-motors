import { useState, createContext, useContext, useEffect } from "react";
import { User } from "../Interfaces/User";

const userJWT = localStorage.getItem("userJWT");

interface Values {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (values: Values) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const URL = import.meta.env.VITE_API_URL; // Así es como se accede en Vite.
export const AuthProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(userJWT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token && token !== "null") {
        const { status, payload } = await checkUser(token);
        if (status === "success") {
          const now = Math.floor(Date.now() / 1000);
          if (payload.exp > now) {
            setUser(payload);
          } else {
            setUser(null);
            localStorage.setItem("userJWT", "null");
          }
        } else {
          setUser(null);
          localStorage.setItem("userJWT", "null");
        }
      } else {
        setUser(null);
        localStorage.setItem("userJWT", "null");
      }
      setLoading(false);
    };
    checkTokenValidity();
  }, [token]);

  const login = async (values: any) => {
    try {
      const response = await fetch(`${URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error al intentar iniciar sesión.");
      } else {
        const { status, payload } = await checkUser(data.token);

        if (status === "success") {
          setUser(payload);
          setToken(data.token);
          localStorage.setItem("userJWT", data.token);
        }
      }

      return data;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  };

  const checkUser = async (token: string) => {
    try {
      const response = await fetch(`${URL}/api/v1/users/check`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",

        },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error checking user" + error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${URL}/api/v1/users/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });


      if (!response.ok) {
        throw new Error("Falló la solicitud al servidor.");
      } else {
        setUser(null);
        setToken(null);
        localStorage.setItem("userJWT", "null");
      }
    } catch (error) {
      console.error("Error al intentar cerrar la sesión:" + error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }

  return context;
};
