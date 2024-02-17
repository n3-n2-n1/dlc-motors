import React, { useState, useEffect, ReactNode } from "react";
import UserActions from "./UserActions";
import UserForm from "../../pages/users/UserForm";
// import { User } from "../../Interfaces/User";
import { useUser } from "../../contexts/UserContext";

const UserList: React.FC = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(users);
  const { users } = useUser();
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    role: "",
    password: "",
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setEditFormData({
      name: user.name,
      role: user.role,
      password: user.password,
    });
  };

  function generatePastelColor() {
    // Genera un color RGB con valores altos para un efecto pastel
    const baseRed = Math.floor(Math.random() * 255 + 100);
    const baseGreen = Math.floor(Math.random() * 323 + 100);
    const baseBlue = Math.floor(Math.random() * 777 + 100);
    return `rgb(${baseRed}, ${baseGreen}, ${baseBlue})`;
  }

  const filteredUsers = users?.filter((user) => user.role);
  const handleSubmitEdit = async (e, userId) => {
    e.preventDefault();
    // Lógica para enviar los datos actualizados al backend
    // Actualizar la lista de usuarios local
    setEditingUserId(null); // Salir del modo de edición
  };

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6 flex-row">
          <h1 className="text-4xl mb-2 text-white font-weight-300">Usuarios</h1>
        </div>
        <div className="justify-center">
          <div className="mt-6"></div>
        </div>
      </div>
      <div className="w-auto">
        {/* // ! La prop debería ser opcional en base a si se va a editar o no algo y solo enviar el usuario a editar */}
        <UserForm user={users} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 text-gray-300">
        {filteredUsers?.map((user) => (
          <div key={user.id} /* ... */>
            {editingUserId === user.id ? (
              // Formulario para editar el usuario
              <form onSubmit={(e) => handleSubmitEdit(e, user.id)}>
                {/* Campos para editar nombre, rol, contraseña */}
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                />
                
                {/* Agregar inputs para role y password de forma similar */}
                <button type="submit">Guardar</button>
                <button onClick={() => setEditingUserId(null)}>Cancelar</button>
              </form>
            ) : (
              // Vista normal de la tarjeta
              <div className="bg-gray-500 p-4 rounded-2xl px-6">
                {/* Información del usuario */}
                <div className="py-1">Nombre: {user.name}</div>
                <div className="py-1">Jerarquia: {user.role}</div>
                <div className="py-1">Contraseña: {user.password}</div>
                {/* Mostrar role y password */}
                <div className="pt-4">

                <button className="bg-white py-2 text-gray-600 rounded-full px-4" onClick={() => handleEditUser(user)}>Editar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
