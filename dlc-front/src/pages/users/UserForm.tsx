import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';

import { User } from "../../Interfaces/User";
import { createUser } from "../../utils/Handlers/Handlers";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
  role: Yup.string().required("Campo requerido"),
  username: Yup.string().required("Campo requerido"),
});

interface UserFormProps {
  user?: User[];
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const initialValues = {
    name: "",
    password: "",
    role: "",
    username: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        createUser(values as any);
        // location.reload();
        toast.success('Usuario creado correctamente.')
        formik.resetForm();
      } catch (error) {
        toast.error( `Error al crear el usuario. ${error}`)
      }
    },
  });

  useEffect(() => {
  }, [formik.errors])


  return (
    <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 overflow-y-auto lg:block pb-4">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray transition-colors duration-300">
        <h1 className="text-3xl mb-2 text-gray-600 dark:text-gray-100 font-weight-300 transition-colors duration-300">
            Agregar usuarios
          </h1>
        <div className="flex-row pt-4 transition-colors duration-300">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md transition-colors duration-300"
          >
            <div className="mb-4 transition-colors duration-300">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                Nombre completo
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
                htmlFor="username"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-300"
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
                htmlFor="role"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                Jerarquía
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.role || ""}
              >
                <option value="" disabled>
                  Seleccione un rol para el usuario
                </option>
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
                className="bg-black hover:bg-gray-600 font-semibold dark:bg-blue-500 text-white py-2 px-4 rounded-2xl dark:hover:bg-blue-600"
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
