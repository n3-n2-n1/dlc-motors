import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Mail inválido").required("Requerido"),
  password: Yup.string().required("Requerido"),
});

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="font-sans text-gray-700 dark:bg-gray-800 dark:text-white flex justify-center items-center h-screen">
      <div className="container mx-auto p-8">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-bold">DLC Motors</h1>

          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form onSubmit={formik.handleSubmit}>
                <div className="relative mb-8">
                  <label className="block mb-2 text-sm font-medium text-gray-400">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="block w-full p-3 rounded bg-gray-200 dark:bg-gray-700 border border-transparent focus:outline-none"
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
                    className="block w-full p-3 rounded bg-gray-200 dark:bg-gray-700 border border-transparent focus:outline-none"
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
                  className="w-full p-3 mt-4 bg-indigo-600 text-white shadow rounded-full"
                >
                  Ingresar
                </button>
              </form>
            </div>

            <div className="flex justify-between p-8 text-sm border-t border-gray-300 dark:bg-gray-900 bg-gray-100">
              <a
                href="#"
                className="font-medium dark:text-indigo-300 text-indigo-500"
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
