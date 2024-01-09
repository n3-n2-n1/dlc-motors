// Importa las librerías necesarias
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createError } from '../../utils/Handlers/Handlers';

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
});

// Componente funcional del formulario de inventario
const ErrorForm: React.FC<ErrorFormProps> = ({
  observationsList,
  products,
}) => {
  // Valores iniciales del formulario
  const initialValues = {
    observaciones:'',
    detalle: '',
    cantidad: 1,
    oemProducto: '',
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
      {({ values }) => (
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
          <div className="mb-4">
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

          {/* Campo de Cantidad */}
          <div className="mb-4">
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-200 dark:text-gray-300">
              Cantidad:
            </label>
            <Field
              type="number"
              id="cantidad"
              name="cantidad"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <ErrorMessage name="cantidad" component="div" className="text-red-500 text-sm mt-1" />
          </div>

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

          {/* Botón de Agregar */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Agregar

          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ErrorForm;
