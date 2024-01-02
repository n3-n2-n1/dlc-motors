import React, { useState } from "react";
import { Formik, Field } from "formik";
import {createUser} from "../../utils/Handlers/Handlers";

// Interfaz para los valores del formulario
export interface FormValues {
  Nombre: string;
  Email: string;
  Password: string;
  selectedRole: string;
}

const RegisterView = () => {
  const [formData, setFormData] = useState<FormValues>({
    Nombre: "",
    Email: "",
    Password: "",
    selectedRole: "VENDEDOR",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      console.log("Form Values:", values);
      setFormData({ Nombre: "", Email: "", Password: "", selectedRole: "" });
  
      // Corrected createUser function call
      await createUser(values);
    } catch (error) {
      console.error("Error en el registro:", error);
    } finally {
      setSubmitting(false);
    }
  };
  

  const handleButtonClick = () => {
    handleSubmit({ ...formData }, { setSubmitting: () => {} });
  };

  return (
    <Formik
      initialValues={{
        Nombre: "",
        Email: "",
        Password: "",
        selectedRole: "VENDEDOR",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
          <div
            className="w-full bg-grey-lightest"
            style={{ paddingTop: "4rem" }}
          >
            <div className="container mx-auto py-8">
              <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                  Registrar nuevo usuario
                </div>
                <div className="py-4 px-8">
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="Nombre"
                      placeholder="Nombre Completo"
                      required
                      onChange={handleInputChange}
                      value={formData.Nombre}
                      className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      required
                      onChange={handleInputChange}
                      value={formData.Email}
                      className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={handleInputChange}
                      value={formData.Password}
                      className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="pt-2 pb-4">
                    <div
                      className="bg-blue-100 border-l-4 border-blue-500 text-gray-600 p-4 "
                      role="alert"
                    >
                      <p className="font-bold">La contraseña debe contener:</p>
                      <p>- Una letra mayúscula</p>
                      <p>- Un número</p>
                      <p>- Un carácter especial </p>
                    </div>
                  </div>

                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterView;
