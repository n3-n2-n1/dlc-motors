import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createError } from "../../utils/Handlers/Handlers";
import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "../../utils/cloudinaryTool";
import { toast } from 'react-toastify';
import { setTimeout } from "timers/promises";


// Define la interfaz para los props del componente
interface ErrorFormProps {
  observationsList: string[];
  products: any[]; // Reemplaza 'any' con el tipo de tus productos
  formName: string;
}

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required("Campo requerido"),
  detalle: Yup.string(),
  stockReal: Yup.number().required("Campo requerido"),
  codigoInt: Yup.string().required("Campo requerido").uppercase(),
  imagen: Yup.mixed() // Opcional: Agrega validaciones específicas para la imagen, si es necesario
    .required("Una imagen es requerida"),
});

// Componente funcional del formulario de inventario
const ErrorForm: React.FC<ErrorFormProps> = ({
  observationsList,
  products,
  formName,
}) => {
  const [imagePreview, setImagePreview] = useState("");

  const initialValues = {
    fecha: "",
    observaciones: "",
    codigoInt: "",
    codOEM: null,
    desc: "",
    stock: 0,
    detalle: "",
    stockReal: 1,
    imagen: null,
  };

  interface IProduct {
    Codigo: string;
    Producto: string;
    Stock: number;
    CodOEM: string;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const imageUrl = await uploadImageToCloudinary(values.imagen);
        console.log('URL de la imagen cargada:', imageUrl);
        toast.success('Imagen cargada con éxito');
        
        const updatedValues = {
          ...values,
          imagen: imageUrl, 
        };
        console.log('Valores del formulario actualizados:', updatedValues); 
        createError(updatedValues); 

        toast.success('Reporte cargado con éxito');
      } catch (error) {
        console.error('Error en el formulario:', error);
        toast.error('Error al cargar la imagen: ' + error);
      }
    },
  });

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    formik.setFieldValue("fecha", new Date().toLocaleString());
    formik.setFieldValue("movementType", formName);
    formik.setFieldValue("codOEM", selectedProduct?.CodOEM);
    formik.setFieldValue("desc", selectedProduct?.Producto);
    formik.setFieldValue("stock", selectedProduct?.Stock);
  }, [selectedProduct, formik.values.stockReal]);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 h-screen overflow-y-auto lg:block hidden pt-4">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="mr-6">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="fecha"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Fecha y Hora
              </label>
              <input
                type="text"
                id="fecha"
                name="fecha"
                value={new Date().toLocaleString()}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                disabled
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="observaciones"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Observaciones
              </label>
              <select
                id="observaciones"
                name="observaciones"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 text-gray-800"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Seleccione...</option>
                {observationsList.map((observation, index) => (
                  <option key={index} value={observation}>
                    {observation}
                  </option>
                ))}
              </select>
              {formik.touched.observaciones && formik.errors.observaciones ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.observaciones}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="codigoInt"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Código de Producto
              </label>
              <input
                type="text"
                id="codigoInt"
                name="codigoInt"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                  const codigoInt = e.target.value;
                  const product = products.find(
                    (product) => product.Codigo === codigoInt
                  );
                  product && setSelectedProduct(product);
                  product || setSelectedProduct(null);

                  formik.setFieldValue("codigoInt", codigoInt);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.codigoInt && formik.errors.codigoInt ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.codigoInt}
                </div>
              ) : null}
            </div>

            {/* Campos fijos de Detalles del producto a reportar. */}
            <div className="mb-4">
              <label
                htmlFor="codOEM"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Código OEM
              </label>
              <input
                type="text"
                id="codOEM"
                name="codOEM"
                value={selectedProduct?.CodOEM || "codOEM no encontrado"}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="producto"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Producto
              </label>
              <input
                type="text"
                id="producto"
                name="producto"
                value={selectedProduct?.Producto || "Producto no encontrado"}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="stockActual"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock Actual
              </label>
              <input
                type="text"
                id="stockActual"
                name="stockActual"
                value={selectedProduct?.Stock || 0}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                disabled
              />
            </div>

            {/* Campo para ingresar el detalle del movimiento */}
            <div className="mb-4">
              <label
                htmlFor="detalle"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Detalle
              </label>
              <input
                type="text"
                id="detalle"
                name="detalle"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.detalle}
              />
              {formik.touched.detalle && formik.errors.detalle ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.detalle}
                </div>
              ) : null}
            </div>

            {/* Campo para el stock real */}
            <div className="mb-4">
              <label
                htmlFor="stockReal"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock real
              </label>
              <input
                type="number"
                id="stockReal"
                name="stockReal"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.stockReal || ""}
              />
              {formik.touched.stockReal && formik.errors.stockReal ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.stockReal}
                </div>
              ) : null}
            </div>

            {/* Campo para cargar la imagen */}
            <div className="mb-4">
              <label
                htmlFor="imagen"
                className="block text-sm font-medium text-gray-200 dark:text-gray-300"
              >
                Imagen:
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files![0];
                  formik.setFieldValue("imagen", file);
                  setImagePreview(URL.createObjectURL(file)); // Actualiza el estado de la previsualización
                }}
                className="mt-1 block w-full p-2 border border-gray-300 text-white dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              />
              {formik.touched.imagen && formik.errors.imagen ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.imagen}
                </div>
              ) : null}
            </div>

            {/* Previsualización de la imagen */}
            {imagePreview && (
              <div className="flex flex-col items-center mb-4 rounded-lg gap-1">
                <h1 className="block text-lg font-medium text-gray-200 dark:text-gray-300">Imagen a cargar:</h1>
                <img
                  src={imagePreview}
                  alt="Previsualización"
                  className="w-32 rounded-xl"
                />
              </div>
            )}
            <div>
              {/* Botón de Agregar */}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ErrorForm;
