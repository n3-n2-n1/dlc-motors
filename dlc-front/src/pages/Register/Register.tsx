import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

// Interfaz para los valores del formulario
interface FormValues {
  name: string;
  email: string;
  password: string;
  selectedRole: string;
}

const RegisterView = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    selectedRole: "VENDEDOR",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      console.log("Form Values:", values);
      setFormData({ name: "", email: "", password: "", selectedRole: "" });
    } catch (error) {
      console.error("Error en el registro:");
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
        name: "",
        email: "",
        password: "",
        selectedRole: "VENDEDOR",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div>
          <Form>
            {/* Resto de tu código */}
            <div className="mb-6">
              <Field
                type="text"
                name="name"
                placeholder="nombre"
                required
                onChange={handleInputChange}
                value={formData.name}
                className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <Field
                type="email"
                name="email"
                placeholder="email"
                required
                onChange={handleInputChange}
                value={formData.email}
                className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <Field
                type="password"
                name="password"
                placeholder="password"
                required
                onChange={handleInputChange}
                value={formData.password}
                className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
              />
            </div>
            {/* Resto de tu código */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleButtonClick}
                className="w-full bg-indigo-600 inline-block text-white no-underline hover:text-indigo-100 py-4 px-4 rounded-sm focus:outline-none"
                disabled={isSubmitting}
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterView;
