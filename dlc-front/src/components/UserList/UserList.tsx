import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import UserForm from "../../pages/users/UserForm";
import Navbar from "../Navbar/Navbar";
import UserCard from "./UserCard";
import Dashcards from "../Dashcards/Dashcards";
import useRoleCheck from "../../hooks/useRoleCheck";
import Loader from "../Loader/Loader";

const UserList: React.FC = () => {
  const { users } = useUser();
  const { user } = useAuth();

  const isSupervisor = useRoleCheck(user?.role, ["Supervisor"]);
  const isFactoryOperator = useRoleCheck(user?.role, ["Operador de fábrica"]);
  const [loading, setLoading] = useState(true);  // Cambiado de isLoading a setLoading y inicializado como true
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
    setSelectedButton(isExpanded ? null : "addUser");
  };

  useEffect(() => {
    if (users) {
      setLoading(false);  // Cambiar el estado de loading cuando los datos están listos
    }
  }, [users]);  // Depender del estado de users

  if (loading) {
    return <Loader />;  // Asegurarse de retornar el Loader correctamente
  }

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 dark:border-gray-800 h-screen overflow-y-auto lg:block p-6">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between transition-colors duration-300">
          <Navbar title="Usuarios" subtitle="" />
          {!isSupervisor && !isFactoryOperator && (
            <div className="transition-colors duration-300">
              <Dashcards
                buttons={[
                  { text: "Agregar usuario", action: toggleVisibility, link: "", isActive: selectedButton === "addUser" },
                ]}
              />
            </div>
          )}
        </div>

        <div className={`w-auto transition-all duration-500 ease-in-out ${isExpanded ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
          <UserForm user={users} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3">
          {users.map((user, index) => <UserCard user={user} key={index} />)}
        </div>
      </div>
    </>
  );
};

export default UserList;
