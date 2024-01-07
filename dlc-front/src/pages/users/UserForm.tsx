import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { User } from "../../Interfaces/User";
import { createUser } from "../../utils/Handlers/Handlers";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
  role: Yup.string().required("Campo requerido"),
  email: Yup.string().email("Debe ingresar un email válido").required("Campo requerido"),
});

/** Administrador
Vendedor
Operador depósito
Supervisor
Operador fábrica
Cliente
 */

// Importa las librerías necesarias

// import { createProduct } from "../../utils/Handlers/Handlers";

interface UserFormProps {
  user: User[];
}

// Componente funcional del formulario de inventario
const UserForm: React.FC<UserFormProps> = ({ user }) => {
  // Valores iniciales del formulario
  const initialValues = {
    name: "",
    password: "",
    role: "",
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createUser(values as any)
      
      console.log(values);
    },
  });

  // Estado para manejar el producto seleccionado
  // const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 overflow-y-auto lg:block hidden mt-16">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="flex-row">
          <h1 className="text-4xl mb-2 text-white font-weight-300">Agregar usuarios</h1>
          <h2 className="text-gray-500 mb-4">
            Formulario para creación de nuevos Usuarios (Sólo administradores){" "}
            <br />
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Nombre completo:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Contraseña
              </label>
              <input
                type="text"
                id="password"
                name="password"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password || ""}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email || ""}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Rol
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.role || ""}
              >
                <option value="" disabled>Seleccione un rol para el usuario</option>
                <option value="Administrador">Administrador</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Operador de depósito">
                  Operador de depósito
                </option>
                <option value="Supervisor">Supervisor</option>
                <option value="Operador de fábrica">Operador de fábrica</option>
                <option value="Cliente">Cliente</option>
              </select>
              {formik.touched.role && formik.errors.role ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.role}
                </div>
              ) : null}
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
