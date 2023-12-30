import React, { useState } from "react";
import {  app } from "../../utils/firebase";
import { Formik } from "formik";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterView = () => {
  //No se si esto esta bien jajajaj
  
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Pred state
  const [selectedRole, setSelectedRole] = useState("VENDEDOR");

  //Manejo el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //Manejo el rol
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Crear usuario en Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Realizar operaciones en Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        name: formData.name,
        email: formData.email,
        role: selectedRole,
      });

      // Restablecer los valores del formulario
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      console.error('Error en el registro:', error.message);
    }
  };
  return (
    <Formik
    initialValues={{ name: "", email: "", password: "" }}
    onSubmit={async (values, { setSubmitting }) => {
      
    }}
  >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
          isSubmitting,
      }) => (
        <div className="flex items-center min-h-screen bg-gray-900">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto my-10 bg-gray-800 p-5 rounded-md shadow-sm">
              <div className="m-7">
                <form action="" method="POST" id="form">
                  <input type="hidden" name="access_key" value="#" />
                  <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="nombre"
                      required
                      className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email"
                      required
                      className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-400">
                      Password
                    </label>
                    <input
                      type="text"
                      name="password"
                      id="password"
                      placeholder="password"
                      onChange={handleInputChange}
                      value={formData.password}
                      required
                      className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-400"
                    id="result"
                  ></p>
                  <div className="mb-6">
                    <button
                    onClick={() => handleRoleChange("ADMIN")}
                      className={`${
                        selectedRole === "ADMINISTRADOR"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-600 text-gray-300"
                      } w-full h-12 rounded-sm mb-2 focus:outline-none`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => handleRoleChange("OPERARIO")}
                      className={`${
                        selectedRole === "OPERARIO"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-600 text-gray-300"
                      } w-full h-12 rounded-sm mb-2 focus:outline-none`}
                    >
                      Operario
                    </button>
                    {/* Repite lo anterior para otros roles */}
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 inline-block text-white no-underline hover:text-indigo-100 py-4 px-4 rounded-sm focus:outline-none"
                      disabled={isSubmitting}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default RegisterView;
