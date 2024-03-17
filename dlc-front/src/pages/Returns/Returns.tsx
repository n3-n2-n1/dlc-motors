import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createReturns } from "../../utils/Handlers/Handlers";
// import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { useQRCodeScanner } from "../../hooks/useQrCodeScanner";

import { useBrandsObservations } from "../../contexts/BrandsObservationsContext.tsx";

const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required("Campo requerido"),
  codigoInt: Yup.string().required("Campo requerido"),
  detalle: Yup.string().required("Campo requerido"),
  cantidad: Yup.number().required("Campo requerido"),
  kit: Yup.number().nullable(),
});

interface IProduct {
  codigoInt: string;
  descripcion: string;
  stock: number;
  codOEM: string;
}

interface ReturnFormProps {
  products: IProduct[];
}

const Returns: React.FC<ReturnFormProps> = ({ products }) => {
  const { returnsObservations } = useBrandsObservations();

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState("");

  const initialValues = {
    fecha: null,
    observaciones: "",
    codigoInt: "",
    codOEM: null,
    desc: "",
    detalle: "",
    stockAnt: null,
    cantidad: null,
    kit: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(formik.errors);
      console.log(values.cantidad);
      console.log(values.kit);
      if (values.kit) {
        values.cantidad = parseInt(values.cantidad) * parseInt(values.kit);
      }
      
      try {
        // await createReturns(values);
        console.log(values);
        formik.resetForm();
      } catch (error) {
        console.error(error);
        // Handle error case here
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

  useEffect(() => {
    formik.setFieldValue("fecha", new Date().toLocaleString());
    formik.setFieldValue("desc", selectedProduct?.descripcion || "");
    formik.setFieldValue("stockAnt", selectedProduct?.stock || 0);
    formik.setFieldValue("codOEM", selectedProduct?.codOEM);
  }, [selectedProduct, formik.values?.stockAnt]);

  useEffect(() => {
    if (qrCode) {
      setIsQrModalOpen(false);
      handleInputChange(qrCode);
      setQrCode("");
    }
  }, [qrCode]);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 h-screen overflow-y-hidden lg:block pt-6">
      {isQrModalOpen && (
        <div>
          {QrReaderComponent}
          {QrReaderButton}
        </div>
      )}
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="mr-6 flex-row">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl mb-2 text-white font-weight-300">
              Devoluciones
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
                htmlFor="fechaHora"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Fecha y Hora
              </label>
              <input
                type="text"
                id="fechaHora"
                name="fechaHora"
                value={new Date().toLocaleString()}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 text-white disabled:bg-gray-900 disabled:text-white"
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
                {returnsObservations.map((observation, index) => (
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
                htmlFor="stockAnt"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock Actual
              </label>
              <input
                type="text"
                id="stockAnt"
                name="stockAnt"
                value={selectedProduct?.stock || 0}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-900 disabled:text-white"
                disabled
              />
            </div>

            {/* Campo de Detalle */}
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
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
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

            {Array.isArray(selectedProduct?.kit) && (
              <div className="mb-4">
                <label
                  htmlFor="kit"
                  className="block text-sm font-medium text-gray-100 dark:text-gray-300"
                >
                  Unidades en Kit
                </label>
                <select
                  required
                  id="kit"
                  name="kit"
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Seleccione...</option>
                  {selectedProduct.kit.map((qty: any, index: any) => (
                    <option key={index} value={qty}>
                      {parseInt(qty)}
                    </option>
                  ))}
                </select>
                {formik.touched.kit && formik.errors.kit ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.kit}
                  </div>
                ) : null}
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

export default Returns;
