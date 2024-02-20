import { useEffect, createContext, useContext, useState } from 'react';
import { User } from '../Interfaces/User';
import { fetchUser } from '../utils/Handlers/Handlers';

interface UserContextProps {
  users: User[] | null;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fakeToken = 'fakeToken123'; // Simula un token
        sessionStorage.setItem('miTokenJWT', fakeToken);
        const token = sessionStorage.getItem('miTokenJWT');

        if (token) {
          const userData = await fetchUser();
          console.log("usuarios de db", userData)
          setUsers(userData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos del usuario', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const value = {
    users,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }

  return context;
};
