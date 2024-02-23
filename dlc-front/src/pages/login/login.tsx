import { useState } from "react";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginUser } from "../../utils/Handlers/Handlers";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Mail inválido").required("Requerido"),
  password: Yup.string().required("Requerido"),
});
function Login() {
  const navigate = useNavigate();

  // useFormik hook para manejar los formularios
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema, // Asegúrate de definir tu esquema de validación de Yup aquí
    onSubmit: async (values) => {
      try {
        // Aquí realizas la llamada al backend con las credenciales
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          // Si la respuesta del servidor no es exitosa, maneja el error
          throw new Error('Error de inicio de sesión');
        }

        const data = await response.json();
        const token = data.token; // Asegúrate de que tu backend devuelva el token con esta clave

        // Almacenar el token en sessionStorage o localStorage
        sessionStorage.setItem('miTokenJWT', token);

        // Mostrar mensaje de éxito y redireccionar al usuario
        toast.success('Sesión iniciada correctamente.');
        navigate('/home'); // Asegúrate de reemplazar esto con la ruta correcta

      } catch (error) {
        console.error('Error en la solicitud:', error);
        toast.error('Error al iniciar sesión.');
      }
    },
  });

  return (
    <div className="font-sans text-gray-700 bg-gray-800 text-white flex justify-center items-center h-screen">
      <div className="container mx-auto p-8">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-bold">DLC Motors</h1>

          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form onSubmit={formik.handleSubmit}>
                <div className="relative mb-8">
                  <label className="block mb-2 text-sm font-medium text-gray-400">
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="block w-full p-3 rounded bg-gray-700 border border-transparent focus:outline-none"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  ></input>
                  {formik.errors.email && formik.touched.email && (
                    <div className="absolute font-medium text-red-500/90">
                      {formik.errors.email}
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
                  onClick={()=> navigate('/')}
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
        </div>
      </div>
    </div>
  );
}

export default Login;
