import React, { useState, useEffect } from "react";
import {getUsers} from "../../utils/Handlers/Handlers"


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

  useEffect(() => {
    getUsers();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-5">
      <div className="text-xs text-gray-400 tracking-wider">USERS</div>
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
      <div className="space-y-4 mt-3">
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow"
          >
            {/* ... (existing user information rendering) */}
            <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <img
                src={user.profileImage}
                className="w-7 h-7 mr-2 rounded-full"
                alt="profile"
              />
              {user.name}
            </div>
            {/* ... (existing user details rendering) */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
