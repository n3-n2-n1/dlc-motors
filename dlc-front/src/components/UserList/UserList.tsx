import { useUser } from "../../contexts/UserContext";

import UserForm from "../../pages/users/UserForm";
import Navbar from "../Navbar/Navbar";
import UserCard from "./UserCard";

const UserList: React.FC = () => {
  const { users } = useUser();
  // const filteredUsers = users?.filter((user) => user.role)

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <Navbar title="Usuarios" subtitle="" />
      </div>
      <div className="w-auto">
        <UserForm user={users} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 text-gray-300">
          {users && users?.map((user) => (
    <UserCard key={user.id} user={user} />
  ))}
      </div>
    </div>
  );
};

export default UserList;