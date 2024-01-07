// Importa las librerías necesarias
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define la interfaz para los props del componente
interface InventoryFormProps {
  products: any[]; // Reemplaza 'any' con el tipo de tus productos
}

// Define el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  productCode: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
  fixedStock: Yup.number().required("Campo requerido"),
  appliedFix: Yup.number().required("Campo requerido"),
});

// Componente funcional del formulario de inventario
const InventoryForm: React.FC<InventoryFormProps> = ({ products }) => {
  // Valores iniciales del formulario
  const initialValues = {
    productCode: "",
    description: "",
    fixedStock: null,
    appliedFix: null,
  };

  interface IProduct {
    Codigo: string;
    Producto: string;
    Stock: number;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // createProduct(values);
      console.log(values);
    },
  });

  // Estado para manejar el producto seleccionado
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-6">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="mr-6 flex-row">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            Inventario
          </h1>
          <h2 className="text-gray-500 mb-4">
            Informá sobre movimientos de inventario <br />
            <span className="text-xs underline">Lo usamos para arreglar el stock de las cosas que contamos y nos dan mal</span>
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="fechaHora"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Fecha y Hora:
              </label>
              <input
                type="text"
                id="fechaHora"
                name="fechaHora"
                value={new Date().toLocaleString()}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="productCode"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Código de Producto:
              </label>
              <input
                type="text"
                id="productCode"
                name="productCode"
                // value={selectedProduct?.Codigo || ""}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                  const productCode = e.target.value;
                  const product = products.find(
                    (product) => product.Codigo === productCode
                  );
                  product && setSelectedProduct(product);
                  product || setSelectedProduct(null);

                  formik.setFieldValue("productCode", productCode);
                }}
                onBlur={formik.handleBlur}
                // value={formik.values.productCode}
              />
              {formik.touched.productCode && formik.errors.productCode ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.productCode}
                </div>
              ) : null}
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
                htmlFor="stockAnterior"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock Actual:
              </label>
              <input
                type="text"
                id="stockAnterior"
                name="stockAnterior"
                value={selectedProduct?.Stock || 0}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                disabled
              />
            </div>

            {/* Campo de Detalle */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Descripción:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            {/* Campo de Cantidad */}
            <div className="mb-4">
              <label
                htmlFor="fixedStock"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock Arreglado:
              </label>
              <input
                type="number"
                id="fixedStock"
                name="fixedStock"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fixedStock || ""}
              />
              {formik.touched.fixedStock && formik.errors.fixedStock ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.fixedStock}
                </div>
              ) : null}
            </div>

            {/* Campo de OEM Producto */}
            <div className="mb-4">
              <label
                htmlFor="appliedFix"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Arreglo realizado (-1, +5, -3…):
              </label>
              <input
                type="number"
                id="appliedFix"
                name="appliedFix"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.appliedFix || ""}
              />
              {formik.touched.appliedFix &&
              formik.errors.appliedFix ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.appliedFix}
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
