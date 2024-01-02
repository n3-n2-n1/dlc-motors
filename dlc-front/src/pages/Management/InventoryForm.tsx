// Importa las librerías necesarias
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define la interfaz para los props del componente
interface InventoryFormProps {
  observationsList: string[];
  isOutcome: boolean;
  products: any[]; // Reemplaza 'any' con el tipo de tus productos
}

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required('Campo requerido'),
  detalle: Yup.string(),
  cantidad: Yup.number().required('Campo requerido'),
  oemProducto: Yup.string().required('Campo requerido').uppercase(),
  importacion: Yup.string().when("observaciones", ([observaciones], schema) => {
    return observaciones === "Importación"
      ? schema.required("Required")
      : schema;
  }),
});

// Componente funcional del formulario de inventario
const InventoryForm: React.FC<InventoryFormProps> = ({
  observationsList,
  isOutcome,
  products,
}) => {
  // Valores iniciales del formulario
  const initialValues = {
    observaciones: '',
    detalle: '',
    cantidad: isOutcome ? 1 : '',
    oemProducto: '',
    importacion: '',
  };

  return (
    
    // Utiliza el componente Formik para gestionar el estado y las validaciones del formulario
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Lógica para manejar la presentación de los datos, por ejemplo, enviar a una API
        console.log(values);
      }}
    >
      {({ values }) => (
        // Componente Form para envolver los campos del formulario
        <Form className="bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md">
          {/* Campo de Observaciones */}
          <div className="mb-4 w-full">
            <p className='block text-xl font-medium text-gray-500 mb-4'>Cargando inventario</p>

            <label htmlFor="observaciones" className="block text-sm font-medium text-gray-300">
              Observaciones:
            </label>
            <Field
              as="select"
              id="observaciones"
              name="observaciones"
              className="mt-1 block w-full p-2 border  border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccione...</option>
              {observationsList.map((observation, index) => (
                <option key={index} value={observation}>
                  {observation}
                </option>
              ))}
            </Field>
            <ErrorMessage name="observaciones" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Campo de Número de Importación (se mostrará si las observaciones son "Importación") */}
          {values.observaciones === 'Importación' && (
            <div className="mb-4">
              <label htmlFor="importacion" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Número de importación:
              </label>
              <Field
                type="text"
                id="importacion"
                name="importacion"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <ErrorMessage name="importacion" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          )}

          {/* Campo de Detalle */}
          <div className="mb-4">
            <label htmlFor="detalle" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
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
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
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
            <label htmlFor="oemProducto" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
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

export default InventoryForm;
