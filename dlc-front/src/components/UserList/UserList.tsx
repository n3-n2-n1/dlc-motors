import { useUser } from "../../contexts/UserContext";
import UserForm from "../../pages/users/UserForm";
import Navbar from "../Navbar/Navbar";
import UserCard from "./UserCard";
import { useState } from "react";
import Dashcards from "../Dashcards/Dashcards";

const UserList: React.FC = () => {
  const { users } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState(false);

  // Función para alternar la visibilidad
  const toggleVisibility = () => {
    setIsExpanded(!isExpanded);
  };
  // const filteredUsers = users?.filter((user) => user.role)

  return (
<>
  <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 dark:border-gray-800 h-screen overflow-y-auto lg:block p-6">
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between transition-colors duration-300">
      <Navbar title="Usuarios" subtitle="" />
      <div className="transition-colors duration-300" onClick={() => setSelectedButton(true ? false: true)}>
        <Dashcards buttons={[{ text: "Agregar usuario", action: toggleVisibility, link:'', isActive: selectedButton === true }]} />
      </div>
    </div>

    <div className={`pt-12 w-auto transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
      <UserForm user={users} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 transition-colors duration-300">
      {users && users?.map((user) => <UserCard user={user} key={user.id} />)}
    </div>
  </div>
</>

  );
};

export default UserList;
