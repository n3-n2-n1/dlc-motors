import { useUser } from "../../contexts/UserContext";
import UserForm from "../../pages/users/UserForm";
import Navbar from "../Navbar/Navbar";
import UserCard from "./UserCard";
import { useState } from "react";

const UserList: React.FC = () => {
  const { users } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);

  // Función para alternar la visibilidad
  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
  };
  // const filteredUsers = users?.filter((user) => user.role)

  return (
    <>
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <Navbar title="Usuarios" subtitle="" />
        <div>
      <button onClick={toggleVisibility} className=" rounded-full text-m px-3 text-gray-900">
        
        <div className="py-4 px-4 border-white border-2 rounded-full bg-white">
        Agregar usuarios
        </div>

      </button>
      </div>

      </div>

      <div className={`w-auto transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
        <UserForm user={users} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 text-gray-300">
        {users && users?.map((user) => <UserCard user={user} />)}
      </div>
    </div>
    </>
  );
};

export default UserList;
