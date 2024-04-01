import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../Interfaces/User";
import { fetchUser } from "../utils/Handlers/Handlers";

interface UserContextProps {
  users: User[] | null;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const token = localStorage.getItem("userJWT");
 
  useEffect(() => {
    const fetchUserData = async () => {

      if (token && token !== "null") {
        const userData = await fetchUser(token);
        setUsers(userData);
      }
    };
  
    if (!users) {
      fetchUserData();
    }
  }, [token, users]);

  const value = {
    users,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }

  return context;
};
