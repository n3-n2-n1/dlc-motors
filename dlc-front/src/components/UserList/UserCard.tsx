import { useState } from "react";

import { editUser, deleteUser } from "../../utils/Handlers/Handlers";

import { useAuth } from "../../contexts/AuthContext";
import useRoleCheck from "../../hooks/useRoleCheck";

const UserCard = ({ user }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({
    name: user.name,
    role: user.role,
    password: user.password,
    username: user.username,
  });

  const { user: loggedUser } = useAuth();

  const isSupervisor = useRoleCheck(loggedUser?.role, ["Supervisor"]);
  const isFactoryOperator = useRoleCheck(loggedUser?.role, ["Operador de fábrica"]);

  const handleEditUser = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmitEdit = (e: any) => {
    e.preventDefault();
    editUser(userToUpdate);
    setIsEditing(false);
  };

  const handleDeleteUser = (e: any) => {
    e.preventDefault();
    deleteUser(userToUpdate.username);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={handleSubmitEdit}
          className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md transition-colors duration-300"
        >
          <input
            type="text"
            value={userToUpdate.name}
            onChange={(e) =>
              setUserToUpdate({ ...userToUpdate, name: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 mb-2 "
          />
          <input
            type="password"
            required
            placeholder="Contraseña nueva"
            onChange={(e) =>
              setUserToUpdate({ ...userToUpdate, password: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 mb-2"
          />
          <select
            value={userToUpdate.role}
            onChange={(e) =>
              setUserToUpdate({ ...userToUpdate, role: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 mb-2"
          >
            <option value="" disabled>
              Seleccione un rol para el usuario
            </option>
            <option value="Administrador">Administrador</option>
            <option value="Vendedor">Vendedor</option>
            <option value="Operador de depósito">Operador de depósito</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Operador de fábrica">Operador de fábrica</option>
            <option value="Cliente">Cliente</option>
          </select>
          <div className="flex gap-2 mt-1 pt-2">
            <button
              type="submit"
              className="bg-black dark:bg-white py-2 dark:text-gray-700 text-gray-100  font-semibold rounded-xl px-4 hover:bg-blue-500 dark:hover:bg-slate-600 dark:hover:text-white"
            >
              Guardar
            </button>
            <button
              onClick={handleDeleteUser}
              className="bg-black dark:bg-white py-2 dark:text-gray-700 text-gray-100  font-semibold rounded-xl px-4 hover:bg-blue-500 dark:hover:bg-slate-600 dark:hover:text-white"
            >
              Eliminar usuario
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-red-600 dark:bg-red-600 py-2 text-white font-semibold rounded-xl px-4 hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4 select-none ">
          <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white max-w-md flex flex-col rounded-xl shadow-lg p-4 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full w-4 h-4 border border-[#6C9C11] dark:border-[#3496CB]"></div>
                <div className="text-xl font-bold">{user.name}</div>
              </div>
              <div className="flex items-center space-x-4">
                {!isSupervisor && !isFactoryOperator && (
                  <button
                    className="bg-white dark:bg-gray-600 py-2 text-gray-600 dark:text-white rounded-lg px-2 hover:bg-blue-500 dark:hover:bg-blue-700"
                    onClick={handleEditUser}
                  >
                    <div className="text-gray-500 hover:text-gray-300 cursor-pointer dark:text-white">
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4 text-gray-600 dark:text-gray-300 font-bold text-sm">
              Rol: {user.role}
            </div>
            <div className="mt-4 text-gray-600 dark:text-gray-300 font-bold text-sm">
              Usuario: {user.username}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
