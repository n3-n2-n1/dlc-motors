import { useEffect, createContext, useContext, useState } from 'react';
import { User } from '../Interfaces/User';
import { fetchUser } from '../utils/Handlers/Handlers';

interface UserContextProps {
  user: User | null;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('miTokenJWT');

        if (token) {
          // Si hay un token, podrías enviarlo al servidor para validar la autenticación.
          const response = await fetchUser();
          const userData = response.json();

          // Verifica si userData es un array o un objeto dependiendo de la estructura de tu respuesta.
          if (Array.isArray(userData)) {
            // Si userData es un array, puedes tomar el primer elemento o manejarlo según tus necesidades.
            setUser(userData[0]);
          } else {
            setUser(userData);
          }
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
    user,
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
