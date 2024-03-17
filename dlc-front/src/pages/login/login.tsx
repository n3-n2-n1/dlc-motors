import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as Yup from "yup";

import { paths } from "../../routes/paths";

import { useAuth } from "../../contexts/AuthContext";

const token = localStorage.getItem("userJWT");

const validationSchema = Yup.object({
  username: Yup.string().required("Requerido"),
  password: Yup.string().required("Requerido"),
});
function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await toast.promise(login(values), {
          pending: "Iniciando sesión... 🕒",
          success: {
            render: "Sesión iniciada correctamente 👌",
            autoClose: 1000,
            onClose: () => {
              navigate("/");
            },
          },
          error: "Error al iniciar sesión, verifica las credenciales 🤯",
        });
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    },
  });

  return (
    <div className="font-sans bg-gray-800 text-white flex justify-center items-center h-screen">
      <div className="container mx-auto p-8">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-bold">DLC Motors</h1>

          {token === "null" ? (
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8">
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative mb-8">
                    <label className="block mb-2 text-sm font-medium text-gray-400">
                      Usuario
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="block w-full p-3 rounded bg-gray-700 border border-transparent focus:outline-none"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    ></input>
                    {formik.errors.username && formik.touched.username && (
                      <div className="absolute font-medium text-red-500/90">
                        {formik.errors.username}
                      </div>
                    )}
                  </div>

                  <div className="relative mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-400">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="block w-full p-3 rounded bg-gray-700 border border-transparent focus:outline-none"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    ></input>
                    {formik.errors.password && formik.touched.password && (
                      <div className="absolute font-medium text-red-500/90">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3 mt-4 bg-blue-600 text-gray-100 shadow rounded-full"
                    // onClick={()=> navigate('/')}
                  >
                    Ingresar
                  </button>
                </form>
              </div>

              <div className="flex justify-between p-8 text-sm border-t border-gray-350 dark:bg-gray-900 bg-gray-700">
                <a
                  href="#"
                  className="font-medium dark:text-indigo-300 text-gray-200"
                >
                  ¿Necesitás ayuda?
                </a>
              </div>
            </div>
          ) : (
            <h2 className="text-2xl text-center font-bold">Redirigiendo...</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
