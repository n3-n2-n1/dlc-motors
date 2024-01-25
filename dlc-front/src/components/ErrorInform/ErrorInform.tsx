// Importa las librerías necesarias
import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { createError } from '../../utils/Handlers/Handlers';
import { useState } from 'react';

// Define la interfaz para los props del componente
interface ErrorFormProps {
  observationsList: string[];
  products: any[]; // Reemplaza 'any' con el tipo de tus productos
}

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required('Campo requerido'),
  detalle: Yup.string(),
  cantidad: Yup.number().required('Campo requerido'),
  oemProducto: Yup.string().required('Campo requerido').uppercase(),
  imagen: Yup.mixed() // Opcional: Agrega validaciones específicas para la imagen, si es necesario
  .required('Una imagen es requerida'),
});

// Componente funcional del formulario de inventario
const ErrorForm: React.FC<ErrorFormProps> = ({
  observationsList,
  products,
}) => {

  const [imagePreview, setImagePreview] = useState('')
  // Valores iniciales del formulario
  const initialValues = {
    observaciones:'',
    detalle: '',
    cantidad: 1,
    oemProducto: '',
    imagen: null,
  };
  return (
    
    // Utiliza el componente Formik para gestionar el estado y las validaciones del formulario
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Asegúrate de que values tenga el tipo correcto
        const { observaciones, detalle, cantidad, oemProducto } = values;
    
        // Resto de la lógica
        createError({ observaciones, detalle, cantidad, oemProducto });
        
        // Restablece el estado de submit
        setSubmitting(false);
        location.reload()
        console.log(values as any)
      }}
    >
      {({setFieldValue}) => (
        // Componente Form para envolver los campos del formulario
        <Form className="">
          {/* Campo de Observaciones */}
          <div className="w-full pt-4">
            <label htmlFor="observaciones" className="block text-sm font-medium text-white 00 dark:text-gray-300">
              Observaciones:
            </label>
            <Field
              as="select"
              id="observaciones"
              name="observaciones"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>Seleccione...</option>
                <option value="Rotura">Se rompió</option>
                <option value="Cambio">Solicita cambio</option>
                <option value="EntregaIncorrecta">Entrega incorrecta</option>
            </Field>
            <ErrorMessage name="observaciones" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          {/* Campo de Detalle */}
          <div className="mb-4 mt-4">
            <label htmlFor="detalle" className="block text-sm font-medium text-gray-200 dark:text-gray-300">
              Detalle:
            </label>
            <Field
              type="text"
              id="detalle"
              name="detalle"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <ErrorMessage name="detalle" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          
          
          {/* //ESTO HAY QUE CAMBIAR A CODIGO INTERNO */}
          {/* Campo de OEM Producto */}
          <div className="mb-4">
            <label htmlFor="oemProducto" className="block text-sm font-medium text-gray-200 dark:text-gray-300">
              OEM Producto:
            </label>
            <Field
              type="text"
              id="oemProducto"
              name="oemProducto"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                // Lógica para buscar el producto en la lista de productos
                const productCode = e.target.value;
                const product = products.find((p) => p.Codigo === productCode);
                if (product) {
                  console.log(product);
                } else {
                  console.log('Producto no encontrado');
                }
              }}
            />
            <ErrorMessage name="oemProducto" component="div" className="text-red-500 text-sm mt-1" />
          </div>

              {/* Campo para cargar la imagen */}
            <div className="mb-4">
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-200 dark:text-gray-300">
              Imagen:
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFieldValue("imagen", file);
                setImagePreview(URL.createObjectURL(file)); // Actualiza el estado de la previsualización
              }}
              className="mt-1 block w-full p-2 border border-gray-300 text-white dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <ErrorMessage name="imagen" component="div" className="text-red-500 text-sm mt-1" />
          </div>


           {/* Previsualización de la imagen */}
           {imagePreview && (
            <div className="mb-4 p-6 bg-white rounded rounded-l">
              <img src={imagePreview} alt="Previsualización" style={{ width: '200px', height: '100px' }} />
            </div>
          )}

          {/* Botón de Agregar */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Agregar

          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ErrorForm;
