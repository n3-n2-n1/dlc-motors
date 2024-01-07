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
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "", 
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const response = await LoginUser(values);
        const data = await response.json();

        // Verifica si el servidor devuelve un token
        if (data.token) {
          // Almacena el token en localStorage
          localStorage.setItem('miTokenJWT', data.token);
          console.log('logueado exitosamente')
          // Asegúrate de cambiar 'miTokenJWT' según el nombre de tu token
        }
          
      } catch (error) {
        console.error('Error en la solicitud:', error);
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
                    Email
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
                  className="w-full p-3 mt-4 bg-blue-600 text-white shadow rounded-full"
                  onClick={()=> navigate('/')}
                >
                  Ingresar
                </button>
              </form>
            </div>

            <div className="flex justify-between p-8 text-sm border-t border-gray-300 dark:bg-gray-900 bg-gray-100">
              <a
                href="#"
                className="font-medium dark:text-indigo-300 text-blue-600"
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
