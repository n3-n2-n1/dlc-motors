import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createError } from "../../utils/Handlers/Handlers";
import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "../../utils/cloudinaryTool";
import { toast } from "react-toastify";
import { useQRCodeScanner } from "../../hooks/useQrCodeScanner";
import { useAuth } from "../../contexts/AuthContext";

// Define la interfaz para los props del componente
interface ErrorFormProps {
  observationsList: string[];
  products: any[]; // Reemplaza 'any' con el tipo de tus productos
  formName: string;
}

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required("Campo requerido"),
  detalle: Yup.string().required("Campo requerido"),
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
  const { user } = useAuth();

  const initialValues = {
    fecha: "",
    observaciones: "",
    codigoInt: "",
    codOEM: null,
    desc: "",
    stock: 0,
    detalle: "",
    stockReal: null,
    imagen: null,
  };

  interface IProduct {
    codigoInt: string;
    descripcion: string;
    stock: any;
    codOEM: string;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const imageUrl = await uploadImageToCloudinary(values.imagen);
        toast.success(`Imagen cargada con éxito: ${imageUrl}`);

        const updatedValues = {
          ...values,
          imagen: imageUrl,
          usuario: user?.name,
        };
        console.log(updatedValues);
        formik.resetForm();
        await createError(updatedValues);
        toast.success(`Reporte cargado con éxito: ${updatedValues}`);
        toast.success("Reporte cargado con éxito");
      } catch (error) {
        console.error("Error en el formulario:", error);
        toast.error("Error al cargar la imagen: " + error);
      }
    },
  });

  const handleInputChange = (codigoInt: string) => {
    const product = products.find((product) => product.codigoInt === codigoInt);
    product && setSelectedProduct(product);
    product || setSelectedProduct(null);

    setInputValue(codigoInt);
    formik.setFieldValue("codigoInt", codigoInt);
  };

  const {
    qrCode,
    setQrCode,
    isQrModalOpen,
    setIsQrModalOpen,
    QrReaderComponent,
    QrReaderButton,
  } = useQRCodeScanner();

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    formik.setFieldValue("fecha", new Date().toLocaleString());
    formik.setFieldValue("codOEM", selectedProduct?.codOEM);
    formik.setFieldValue("desc", selectedProduct?.descripcion);
    formik.setFieldValue(
      "stock",
      selectedProduct?.stock === "" ? 0 : selectedProduct?.stock
    );
  }, [selectedProduct, formik.values.stockReal]);

  useEffect(() => {
    if (qrCode) {
      setIsQrModalOpen(false);
      handleInputChange(qrCode);
      setQrCode("");
    }
  }, [qrCode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-900 h-screen overflow-y-auto lg:block pt-4 transition-colors duration-300">
      {isQrModalOpen && (
        <div>
          {QrReaderComponent}
          {QrReaderButton}
        </div>
      )}
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ">
        <div className="pb-1">
          <form
            onSubmit={formik.handleSubmit}
            className="dark:bg-gray-900 bg-white text-black dark:text-white p-4 rounded-md shadow-md transition-colors duration-300"
          >
            <div className="mb-4">
              <label
                htmlFor="fecha"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Fecha y Hora
              </label>
              <input
                type="text"
                id="fecha"
                name="fecha"
                value={new Date().toLocaleString()}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                onChange={formik.handleChange}
                disabled
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="observaciones"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Observaciones
              </label>
              <select
                id="observaciones"
                name="observaciones"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Código interno
              </label>
              <input
                type="text"
                id="codigoInt"
                name="codigoInt"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                  handleInputChange(e.target.value);
                }}
                onBlur={formik.handleBlur}
                value={inputValue}
              />
              {QrReaderButton}
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
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Código OEM
              </label>
              <input
                type="text"
                id="codOEM"
                name="codOEM"
                value={selectedProduct?.codOEM || "codOEM no encontrado"}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Descripción
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={selectedProduct?.descripcion || "Producto no encontrado"}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="stockActual"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Stock Actual
              </label>
              <input
                type="text"
                id="stockActual"
                name="stockActual"
                value={selectedProduct?.stock || 0}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
              />
            </div>

            {/* Campo para ingresar el detalle del movimiento */}
            <div className="mb-4">
              <label
                htmlFor="detalle"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Detalle
              </label>
              <input
                type="text"
                id="detalle"
                name="detalle"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Stock real
              </label>
              <input
                type="number"
                id="stockReal"
                name="stockReal"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Foto ficha
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
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                <h1 className="block text-lg font-medium text-gray-600 dark:text-gray-300">
                  Imagen a cargar:
                </h1>
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
