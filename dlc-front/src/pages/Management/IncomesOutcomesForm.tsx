// Importa las librerías necesarias
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createMovement } from "../../utils/Handlers/Handlers";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQRCodeScanner } from "../../hooks/useQrCodeScanner";
import { useAuth } from "../../contexts/AuthContext";

interface IncomesOutcomesFormProps {
  formName: string;
  observationsList: string[];
  products: any[];
}

// !! Hay que hacer que, en caso de que no encuentre un producto, tire un error en el yup para que no permita continuar con el formulario.

const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required("Campo requerido"),
  desc: Yup.string().required("Campo requerido"),
  cantidad: Yup.number()
    .min(1, "La cantidad no puede ser menor a 1")
    .required("Campo requerido"),
  codigoInt: Yup.string().required("Campo requerido"),
  kit: Yup.number().nullable(),
  stockAct: Yup.number().min(0, "El stock restante no puede ser menor a 0"),
  // No se valida el campo `detalle` para que no sea obligatorio
});

const IncomesOutcomesForm: React.FC<IncomesOutcomesFormProps> = ({
  formName,
  observationsList,
  products,
}) => {
  const { user } = useAuth();

  const initialValues = {
    date: "",
    observaciones: "",
    codigoInt: "",
    codOEM: null,
    tipoMov: "",
    desc: "",
    stockActual: 0,
    marcasCompatibles: "",
    rubro: "",
    detalle: "",
    cantidad: 1,
    kit: null,
    stockAct: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedValues = {
          ...values,
          detalle: values.detalle || "", // Se asegura de que `detalle` sea una cadena vacía si está vacío
          usuario: user?.name,
        };

        console.log(updatedValues)
        if (updatedValues.stockAct < 0) {
          toast.error("No se puede realizar el movimiento, stock insuficiente");
          return;
        } else {
          formik.resetForm();
          await createMovement(updatedValues);
          toast.success(`${formik.values.tipoMov} creado`);
          window.location.reload();
        }
      } catch (error) {
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
    formik.setFieldValue("stock", selectedProduct?.stock || 0);
    formik.setFieldValue("rubro", selectedProduct?.rubro);
    formik.setFieldValue("marcasCompatibles", selectedProduct?.marcasCompatibles.join(' / '));

    formik.setFieldValue(
      "stockAct",
      formName === "Ingreso"
        ? (parseInt(selectedProduct?.stock || 0) ?? 0) +
            (parseInt(formik.values.cantidad) ?? 0)
        : (parseInt(selectedProduct?.stock || 0) ?? 0) -
            (parseInt(formik.values.cantidad) * (formik.values.kit || 1) ?? 0)
    );
  }, [selectedProduct, formik.values.cantidad]);

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
        <div className="flex flex-col overflow-x-auto w-fulltext-sm h-screen  bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-gray-100 dark:bg-gray-900 mb-4 transition-colors duration-300">
            <h1 className="text-3xl mb-2 text-gray-600 dark:text-gray-100 font-weight-300 transition-colors duration-300">
              {formName}s
            </h1>
            <div className="bg-black dark:bg-blue-500 hover:dark:bg-blue-600 text-white dark:text-gray-600 rounded-full justify-center hover:bg-gray-800 mr-6">
              <Link to="/historyView/Return">
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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

            {/* Campos fijos de Detalles del producto a cambiar. */}
            <div className="mb-4">
              <label
                htmlFor="codOEM"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              {formik.touched.codigoInt && formik.errors.codOEM ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.codOEM}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descripcion
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
            <div className="mb-4">
              <label
                htmlFor="rubro"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Rubro
              </label>
              <input
                type="text"
                id="rubro"
                name="rubro"
                value={selectedProduct?.rubro || ''}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="marcas"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Marcas Compatibles
              </label>
              <input
                type="text"
                id="marcas"
                name="marcas"
                value={selectedProduct?.marcasCompatibles.join(' / ') || ''}
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
              />
            </div>

            {/* Campo para ingresar el detalle del movimiento */}
            <div className="mb-4">
              <label
                htmlFor="detalle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                value={formik.values.detalle.trim() === '' ? '' : formik.values.detalle}
              />
              {/* {formik.touched.detalle && formik.errors.detalle ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.detalle}
                </div>
              ) : null} */}
            </div>

            {/* Campo para la cantidad ingresada/egresada */}
            <div className="mb-4">
              <label
                htmlFor="cantidad"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cantidad {formName === "Ingreso" ? "ingresada" : "egresada"}
              </label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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

            {formName === "Egreso" &&
              Array.isArray(selectedProduct?.kit) &&
              selectedProduct.kit[0] !== 0 && (
                <div className="mb-4">
                  <label
                    htmlFor="kit"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Unidades en Kit
                  </label>
                  <select
                    required
                    id="kit"
                    name="kit"
                    className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Stock actualizado
              </label>
              <input
                type="number"
                id="stockAct"
                name="stockAct"
                value={
                  formName === "Ingreso"
                    ? (Number(formik.values.cantidad) ?? 0) +
                      (parseInt(selectedProduct?.stock || 0) ?? 0)
                    : (parseInt(selectedProduct?.stock || 0) ?? 0) -
                      (parseInt(formik.values.cantidad) *
                        (formik.values.kit || 1) ?? 0)
                }
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                disabled
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.stockAct && formik.errors.stockAct ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.stockAct}
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

export default IncomesOutcomesForm;
