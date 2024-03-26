// Importa las librerías necesarias
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createInventoryMovement } from "../../utils/Handlers/Handlers";
import { Link } from "react-router-dom";
import { useQRCodeScanner } from "../../hooks/useQrCodeScanner";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

// Define la interfaz para los props del componente
interface InventoryFormProps {
  products: any[]; // Reemplaza 'any' con el tipo de tus productos
}

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  codigoInt: Yup.string().required("Campo requerido"),
  desc: Yup.string().required("Campo requerido"),
  stockAct: Yup.number().required("Campo requerido"),
  arreglo: Yup.number().required("Campo requerido"),
});

// Componente funcional del formulario de inventario
const InventoryForm: React.FC<InventoryFormProps> = ({ products }) => {
  const { user } = useAuth();

  // Valores iniciales del formulario
  const initialValues = {
    fecha: "",
    codOEM: null,
    tipoMov: "",
    codigoInt: "",
    desc: "",
    stockAct: null,
    arreglo: null,
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
        const updatedValues = {
          ...values,
          usuario: user?.name,
        };
        if (updatedValues?.stockAct && updatedValues?.stockAct < 0) {
          toast.error(
            "No se puede realizar el movimiento, stock no puede quedar negativo"
          );
          return;
        } else {
          // formik.resetForm();
          await createInventoryMovement(updatedValues);
          console.log(updatedValues);
          toast.success("Movimiento creado con éxito");
        }

      } catch (error) {
        toast.error("Error al crear el movimiento");
        console.error(error);
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

  // Estado para manejar el producto seleccionado
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [inputValue, setInputValue] = useState("");

  // Establecer el valor de 'date' y 'updatedStock' en el estado de Formik
  useEffect(() => {
    formik.setFieldValue("fecha", new Date().toLocaleString());
    formik.setFieldValue("tipoMov", "Inventario");
    formik.setFieldValue("codOEM", selectedProduct?.codOEM);
    formik.setFieldValue("desc", selectedProduct?.descripcion);
    formik.setFieldValue("stock", selectedProduct?.stock);
  }, [selectedProduct]);

  useEffect(() => {
    if (formik.values.stockAct !== null && selectedProduct !== null) {
      const arreglo = formik.values.stockAct - selectedProduct.stock;
      formik.setFieldValue("arreglo", arreglo);
    }
  }, [formik.values.stockAct]);

  useEffect(() => {
    if (qrCode) {
      setIsQrModalOpen(false);
      handleInputChange(qrCode);
      setQrCode("");
    }
  }, [qrCode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block transition-colors duration-300">
      {isQrModalOpen && (
        <div>
          {QrReaderComponent}
          {QrReaderButton}
        </div>
      )}
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray overflow-auto transition-colors duration-300">
        <div className="overflow-auto">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-gray-100 dark:bg-gray-900 mb-4 pt-6 transition-colors duration-300">
            <h1 className="text-3xl mb-2 text-gray-600 dark:text-gray-100 font-weight-300 transition-colors duration-300">
              Inventario
            </h1>
            <div className="bg-black dark:bg-blue-500 hover:dark:bg-blue-600 text-white dark:text-gray-600 rounded-full justify-center hover:bg-gray-800 mr-6 transition-colors duration-300">
              <Link to="/historyView">
                <button className="p-3 text-md font-bold text-white">
                  Historial
                </button>
              </Link>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-md shadow-md transition-colors duration-300"
          >
            <div className="mb-4">
              <label
                htmlFor="fechaHora"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Fecha y Hora
              </label>
              <input
                type="text"
                id="fechaHora"
                name="fechaHora"
                value={new Date().toLocaleString()}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
              />
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
                htmlFor="stockAnterior"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Stock Actual
              </label>
              <input
                type="text"
                id="stockAnterior"
                name="stockAnterior"
                value={selectedProduct?.stock || 0}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
              />
            </div>

            {/* Campo de Cantidad */}
            <div className="mb-4">
              <label
                htmlFor="stockAct"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Stock Arreglado
              </label>
              <input
                type="number"
                id="stockAct"
                name="stockAct"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.stockAct || ""}
              />
              {formik.touched.stockAct && formik.errors.stockAct ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.stockAct}
                </div>
              ) : null}
            </div>

            {/* Campo de OEM Producto */}
            <div className="mb-4">
              <label
                htmlFor="arreglo"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Arreglo realizado (-1, +5, -3…)
              </label>
              <input
                type="number"
                id="arreglo"
                name="arreglo"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.arreglo || ""}
              />
              {formik.touched.arreglo && formik.errors.arreglo ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.arreglo}
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

export default InventoryForm;
