// Importa las librerías necesarias
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createMovement } from "../../utils/Handlers/Handlers";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQRCodeScanner } from "../../hooks/useQrCodeScanner";

// Define la interfaz para los props del componente
interface IncomesOutcomesFormProps {
  formName: string;
  observationsList: string[];
  products: any[]; //! TYPE
}

// !! Hay que hacer que, en caso de que no encuentre un producto, tire un error en el yup para que no permita continuar con el formulario.

// Fecha y hora del ingreso	(Campo fijo)
//* Observaciones (menú desplegable)
//* Detalle (agregar texto)
//* Cantidad ingresada
//* OEM del producto
// Descripción detallada  (Campo fijo)
// Stock resultante luego del ingreso (Campo fijo)

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required("Campo requerido"),
  desc: Yup.string().required("Campo requerido"),
  detalle: Yup.string().required("Campo requerido"),
  cantidad: Yup.number().required("Campo requerido"),
  codigoInt: Yup.string().required("Campo requerido"),
  kit: Yup.number().nullable(),
});

// Componente funcional del formulario de inventario
const IncomesOutcomesForm: React.FC<IncomesOutcomesFormProps> = ({
  formName,
  observationsList,
  products,
}) => {
  // Valores iniciales del formulario
  const initialValues = {
    date: "",
    observaciones: "",
    codigoInt: "",
    codOEM: null,
    tipoMov: "",
    desc: "",
    detalle: "",
    cantidad: null,
    kit: null,
    stockAct: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await createMovement(values);
        console.log(values);
        toast.success("Movimiento creado");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Error al crear el movimiento");
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
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState("");

  // Establecer el valor de 'date' y 'stockAct' en el estado de Formik
  useEffect(() => {
    formik.setFieldValue("date", new Date().toLocaleString());
    formik.setFieldValue("tipoMov", formName);
    formik.setFieldValue("codOEM", selectedProduct?.codOEM);
    formik.setFieldValue("desc", selectedProduct?.descripcion);
    formik.setFieldValue("stock", selectedProduct?.stock);

    formik.setFieldValue(
      "stockAct",
      formName === "Ingreso"
        ? (selectedProduct?.stock ?? 0) + (formik.values?.cantidad ?? 0)
        : (selectedProduct?.stock ?? 0) - (formik.values?.cantidad ?? 0)
    );
  }, [selectedProduct, formik.values.cantidad]);

  useEffect(() => {
    if (qrCode) {
      setIsQrModalOpen(false);
      handleInputChange(qrCode);
      setQrCode("");
    }
  }, [qrCode]);

  useEffect(() => {
    console.log(selectedProduct);
    console.log(products)
  }, [selectedProduct]);

  return (
    <div className="bg-gray-900 w-full flex-shrink-0 h-screen lg:block pt-4 pb-10 overflow-auto">
      {isQrModalOpen && (
        <div>
          {QrReaderComponent}
          {QrReaderButton}
        </div>
      )}
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray overflow-auto">
        <div className="mr-6 pb-10 overflow-auto">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl mb-2 text-white font-weight-300">
              {formName}s
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

            {/* Campos fijos de Detalles del producto a cambiar. */}
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
                Descripcion
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

            {/* Campo para la cantidad ingresada/egresada */}
            <div className="mb-4">
              <label
                htmlFor="cantidad"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Cantidad {formName === "Ingreso" ? "ingresada" : "egresada"}
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

            {formName === "Egreso" && Array.isArray(selectedProduct?.kit) && (
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
                      {qty}
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

            {/* Campo fijo de Stock resultante */}
            <div className="mb-4">
              <label
                htmlFor="stockAct"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock actualizado
              </label>
              <input
                type="number"
                id="stockAct"
                name="stockAct"
                value={
                  formName === "Ingreso"
                    ? (selectedProduct?.stock ?? 0) +
                      (formik.values.cantidad ?? 0)
                    : (selectedProduct?.stock ?? 0) -
                      ((formik.values.cantidad * formik.values.kit || 1) ?? 0)
                }
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-900 disabled:text-white"
                disabled
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
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

export default IncomesOutcomesForm;
