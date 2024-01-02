import React, { useState, useEffect } from "react";
import UserActions from "./UserActions";

interface User {
  id: number;
  name: string;
  role: string;
  profileImage: string;
  // Add other user properties as needed
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(users)

  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch("http://localhost:3000/usuarios");
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const responseData = await response.json();
          const userData: User[] = responseData.map((data: any) => ({
            id: data.id, // Ajustar según la estructura real de los datos
            name: data.Nombre, // Ajustar según la estructura real de los datos
            role: data.selectedRole, // Ajustar según la estructura real de los datos
            profileImage: data.profileImage // Ajustar según la estructura real de los datos
          }));
  
          console.log('User Data:', userData);
          setUsers(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Manejar el error según sea necesario
        }
      };
  
      fetchUsers();
    }, []);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
  user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-5">
      <div className="text-xs text-gray-400 tracking-wider">Usuarios Registrados</div>
      <UserActions />
      <div className="relative mt-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
          placeholder="Search"
        />
        {/* ... (existing search icon) */}
      </div>
      <div className="space-y-4 mt-3 text-gray-300">
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            className="bg-gray-700 p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow"
          >
            {/* ... (existing user information rendering) */}
            <div className="flex xl:flex-row flex-col items-center font-medium text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <img
                src={user.profileImage}
                className="w-7 h-7 mr-2 rounded-full"
                alt="profile"
              />
              {user.name}

            </div>
              {user.role}
            {/* ... (existing user details rendering) */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
