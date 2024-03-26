import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ThemeToggleButton from "../../utils/StyleToggle";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../components/PageTitle/PageTitle";
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

  useEffect(() => {
    // Solo recarga si el token es "null" o inexistente
    if (!user && (token === "null" || !token)) {
      const timer = setTimeout(() => {
        navigate('/login'); // Cambia a la ruta de login o recarga
      }, 5000);

      // Limpiar el temporizador al desmontar el componente
      return () => clearTimeout(timer);
    }
  }, [user, token, navigate]);

  const styles = `
  @keyframes gradientX {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradientX 15s ease infinite;
  }
  `;

  return (
    <>
    <PageTitle title="DLC Motors • Ingreso" />
      <style>{styles}</style>
      <div className="fixed inset-0 dark:bg-gradient-to-tl dark:from-black dark:via-[#CDFF71] dark:to-[#374151] bg-gradient-to-r from-white via-blue-500 to-slate-600 animate-gradient-x -z-10">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative font-sans bg-transparent text-white flex justify-center items-center h-screen select-none overflow-hidden z-0">
        <div className="container mx-auto p-8 z-10">
          <div className="max-w-md w-full mx-auto z-10">
            <h1 className="text-gray-100 dark:text-gray-100 text-3xl text-center mb-12 font-bold z-10">
              DLC Motors | Gestión Integral
            </h1>

            {token === "null" ? (
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl z-10 ">
                <div className="p-8 z-10">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="relative mb-8">
                      <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200 outline-none">
                        Usuario
                      </label>
                      <input
                        type="text"
                        name="username"
                        className="block w-full p-3 rounded text-black dark:text-gray-200 bg-gray-300 dark:bg-gray-700 border border-transparent focus:outline"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      ></input>
                      {formik.errors.username && formik.touched.username && (
                        <div className="absolute font-medium text-red-500/90">
                          {formik.errors.username}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-5 z-10">
                      <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="block w-full p-3 rounded text-black dark:text-gray-200 bg-gray-300 dark:bg-gray-700 border border-transparent focus:outline"
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
                      className="w-full p-3 mt-4 bg-black font-semibold hover:shadow-2xl dark:bg-blue-500 hover:dark:bg-blue-600 hover:bg-gray-800 text-gray-100 shadow rounded-full"
                      // onClick={()=> navigate('/')}
                    >
                      Ingresar
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl text-center font-bold dark:text-gray-200 blink">
                  Redirigiendo... <br/>

                </h2>
                <p className="text-sm text-center font bold pt-4">Si permaneces aquí por más de 10 segundos
                  apreta F5</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full absolute bottom-0 pb-8 flex justify-center hover:opacity-25" onClick={()=>{alert('Contáctese a: krystalloquartz@gmail.com o 1132379661. Lun a Vie 09:00 - 20:00hs')}}>
          
          <div className="mr-4">
            
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.38477 9.90349C2.4982 6.16224 4.40144 2.00488 10.0001 2.00488C15.5885 2.00488 17.4951 6.14704 17.6148 9.88295"
              stroke="#020202"
              strokeWidth="2.03571"
              strokeLinecap="round"
            />
            <path
              d="M1.85742 12.1832C1.85742 9.08117 3.92545 8.30566 4.95946 8.30566C6.82069 8.30566 7.28599 9.85668 7.28599 10.6322V13.7342C7.28599 15.5955 5.73497 16.0608 4.95946 16.0608C3.92545 16.0608 1.85742 15.2853 1.85742 12.1832Z"
              fill="#CDFF71"
            />
            <path
              d="M1.85742 12.1832C1.85742 9.08117 3.92545 8.30566 4.95946 8.30566C6.82069 8.30566 7.28599 9.85668 7.28599 10.6322V13.7342C7.28599 15.5955 5.73497 16.0608 4.95946 16.0608C3.92545 16.0608 1.85742 15.2853 1.85742 12.1832Z"
              stroke="#020202"
              strokeWidth="2.03571"
            />
            <path
              d="M18.1426 12.1832C18.1426 9.08117 16.0746 8.30566 15.0405 8.30566C13.1793 8.30566 12.714 9.85668 12.714 10.6322V13.7342C12.714 15.5955 14.265 16.0608 15.0405 16.0608C16.0746 16.0608 18.1426 15.2853 18.1426 12.1832Z"
              fill="#CDFF71"
            />
            <path
              d="M18.1426 12.1832C18.1426 9.08117 16.0746 8.30566 15.0405 8.30566C13.1793 8.30566 12.714 9.85668 12.714 10.6322V13.7342C12.714 15.5955 14.265 16.0608 15.0405 16.0608C16.0746 16.0608 18.1426 15.2853 18.1426 12.1832Z"
              stroke="#020202"
              strokeWidth="2.03571"
            />
            <path
              d="M17.6984 14.3662C17.6984 14.3662 17.8044 16.8048 16.5533 17.8651C15.3022 18.9254 12.1426 18.9042 12.1426 18.9042"
              stroke="#020202"
              strokeWidth="2.03571"
              strokeLinecap="round"
            />
          </svg>
          </div>
          <p className="text-white font-semibold text-xs underline">

          ¿Problemas con la plataforma? Contáctate.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
