import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createDelivery } from "../../utils/Handlers/Handlers";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQRCodeScanner } from "../../hooks/useQrCodeScanner";
import { Link } from "react-router-dom"

// Define la interfaz para los props del componente
interface DeliveryFormProps {
  observationsList: string[];
  products: any[]; // Reemplaza 'any' con el tipo de tus productos
  formName: string;
}

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required("Campo requerido"),
  codigoInt: Yup.string().required("Campo requerido").uppercase(),
  numImpo: Yup.string().required("Campo requerido"),
  cantidad: Yup.number().required("Campo requerido"),
});

// Componente funcional del formulario de inventario
const DeliveryForm: React.FC<DeliveryFormProps> = ({
  observationsList,
  products,
}) => {
  const initialValues = {
    fecha: "",
    observaciones: "",
    codigoInt: "",
    codOEM: null,
    desc: "",
    stock: 0,
    numImpo: "",
    cantidad: 0,
  };

  interface IProduct {
    codigoInt: string;
    descripcion: string;
    stock: number;
    codOEM: string;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        createDelivery(values);
        toast.success("{} creado correctamente");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Error al crear el reporte.");
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
    formik.setFieldValue("stock", selectedProduct?.stock);
  }, [selectedProduct, formik.values.cantidad]);

  useEffect(() => {
    if (qrCode) {
      setIsQrModalOpen(false);
      handleInputChange(qrCode);
      setQrCode("");
    }
  }, [qrCode]);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 h-screen overflow-y-auto lg:block pt-4">
      {isQrModalOpen && (
        <div>
          {QrReaderComponent}
          {QrReaderButton}
        </div>
      )}
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="mr-6">
        <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl mb-2 text-white font-weight-300">
              Pedidos
            </h1>
            <div className="bg-gray-700 rounded-full justify-center hover:bg-gray-800">
              <Link to="/historyView">
                <button className="p-3 text-md font-bold text-white">
                  Historial
                </button>
              </Link>
            </div>
          </div>
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
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-900 disabled:text-white"
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
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
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
                Código interno
              </label>
              <input
                type="text"
                id="codigoInt"
                name="codigoInt"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
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
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Código OEM
              </label>
              <input
                type="text"
                id="codOEM"
                name="codOEM"
                value={selectedProduct?.codOEM || "codOEM no encontrado"}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-900 disabled:text-white"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Descripción
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={selectedProduct?.descripcion || "Producto no encontrado"}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-900 disabled:text-white"
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
                value={selectedProduct?.stock || 0}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-900 disabled:text-white"
                disabled
              />
            </div>

            {/* Campo para ingresar el numero de importacion del movimiento */}
            <div className="mb-4">
              <label
                htmlFor="numImpo"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Numero de Importacion
              </label>
              <input
                type="text"
                id="numImpo"
                name="numImpo"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.numImpo}
              />
              {formik.touched.numImpo && formik.errors.numImpo ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.numImpo}
                </div>
              ) : null}
            </div>

            {/* Campo para el stock real */}
            <div className="mb-4">
              <label
                htmlFor="cantidad"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cantidad || ""}
              />
              {formik.touched.cantidad && formik.errors.cantidad ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.cantidad}
                </div>
              ) : null}
            </div>
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

export default DeliveryForm;
