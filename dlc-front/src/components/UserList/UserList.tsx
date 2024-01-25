import React, { useState, useEffect } from "react";
import UserActions from "./UserActions";
import { fetchUser } from "../../utils/Handlers/Handlers";
import UserForm from "../../pages/users/UserForm";
import { User } from "../../Interfaces/User";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser();
        setUsers(userData);
      } catch (error) {
        // Handle the error here if needed
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => user.role);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6 flex-row">
          <h1 className="text-4xl mb-2 text-white font-weight-300">Usuarios</h1>
        </div>
        <UserActions />
        <div className="justify-center">
          <div className="mt-6"></div>
        </div>
      </div>
      <div className="w-auto">
        <UserForm user={users} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 text-gray-300">
        {filteredUsers.map((user) => (
          <div
            key={user.name}
            className="bg-gray-300 p-3 flex flex-col rounded-md dark:bg-gray-800 shadow"
          >
            <div className="flex flex-row items-center font-medium text-gray-700 pb-2 mb-2 border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full bg-blue">
              <div className="mr-2 font-bold text-gray-700">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_4_5896"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_4_5896)">
                    <path
                      d="M10 10.8333C10.8056 10.8333 11.4931 10.5486 12.0625 9.97917C12.6319 9.40972 12.9167 8.72222 12.9167 7.91667C12.9167 7.11111 12.6319 6.42361 12.0625 5.85417C11.4931 5.28472 10.8056 5 10 5C9.19444 5 8.50694 5.28472 7.9375 5.85417C7.36806 6.42361 7.08333 7.11111 7.08333 7.91667C7.08333 8.72222 7.36806 9.40972 7.9375 9.97917C8.50694 10.5486 9.19444 10.8333 10 10.8333ZM4.16667 17.5C3.70833 17.5 3.31583 17.3369 2.98917 17.0108C2.66306 16.6842 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66306 3.31583 2.98917 2.98917C3.31583 2.66306 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.6842 2.66306 17.0108 2.98917C17.3369 3.31583 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3369 16.6842 17.0108 17.0108C16.6842 17.3369 16.2917 17.5 15.8333 17.5H4.16667ZM4.16667 15.8333H15.8333V14.875C15.0833 14.1389 14.2119 13.5589 13.2192 13.135C12.2258 12.7117 11.1528 12.5 10 12.5C8.84722 12.5 7.77444 12.7117 6.78167 13.135C5.78833 13.5589 4.91667 14.1389 4.16667 14.875V15.8333Z"
                      fill="#000000"
                    />
                  </g>
                </svg>
              </div>
              {user.name}
            </div>
            <div className=" text-gray-700">

            Jerarquía: {user.role}
            </div>
            <div className=" text-gray-700 font-bold">Contraseña: {user.password}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
