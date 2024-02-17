// Importa las librerías necesarias
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createMovement } from "../../utils/Handlers/Handlers";
import { Link } from "react-router-dom";

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
  cantidad: Yup.number().required("Campo requerido"),
  codigoInt: Yup.string().required("Campo requerido"),
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
    cantidad: null,
    stockAct: 0,
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
    onSubmit: (values) => {
      createMovement(values);
      alert("creadooooooo");
      console.log(values);
    },
  });

  // Estado para manejar el producto seleccionado
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  // Establecer el valor de 'date' y 'stockAct' en el estado de Formik
  useEffect(() => {
    formik.setFieldValue("date", new Date().toLocaleString());
    formik.setFieldValue("tipoMov", formName);
    formik.setFieldValue("codOEM", selectedProduct?.CodOEM);
    formik.setFieldValue("descripcion", selectedProduct?.Producto);
    formik.setFieldValue("stock", selectedProduct?.Stock);

    formik.setFieldValue(
      "stockAct",
      formName === "Ingreso"
        ? (selectedProduct?.Stock ?? 0) + (formik.values?.cantidad ?? 0)
        : (selectedProduct?.Stock ?? 0) - (formik.values?.cantidad ?? 0)
    );
  }, [selectedProduct, formik.values.cantidad]);

  return (
    <div className="bg-gray-900 w-full flex-shrink-0 h-screen lg:block hidden pt-4 pb-10 overflow-auto">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray overflow-auto">
        
        <div className="mr-6 pb-10 overflow-auto">
          <h1 className="text-3xl mb-2 text-white font-weight-300 pb-4">
            {formName}s
          </h1>
          

          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Fecha y Hora
              </label>
              <input
                type="text"
                id="date"
                name="date"
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
                htmlFor="desc"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Detalle
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.desc}
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.desc}
                </div>
              ) : null}
            </div>

            {/* Campo para la cantidad ingresada/egresada */}
            <div className="mb-4">
              <label
                htmlFor="cantidad"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Cantidad {formName === "Ingreso" ? "ingresada" : "descontada"}
              </label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
                    ? (selectedProduct?.Stock ?? 0) +
                      (formik.values.cantidad ?? 0)
                    : (selectedProduct?.Stock ?? 0) -
                      (formik.values.cantidad ?? 0)
                }
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
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
