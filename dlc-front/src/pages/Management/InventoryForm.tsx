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
  codigoProducto: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
  stockArreglado: Yup.number().required("Campo requerido"),
  arregloRealizado: Yup.number().required("Campo requerido"),
});

// Componente funcional del formulario de inventario
const InventoryForm: React.FC<InventoryFormProps> = ({ products }) => {
  // Valores iniciales del formulario
  const initialValues = {
    codigoProducto: "",
    descripcion: "",
    stockArreglado: 0,
    arregloRealizado: 0,
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
            Ingresa productos al inventario
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
                {formik.values.arregloRealizado}
                <br />
                {formik.values.stockArreglado}
                <br />
                {formik.values.descripcion}
                <br />
                {formik.values.codigoProducto}
                <br />
                Fecha y Hora:
                {formik.errors.arregloRealizado}
                <br />
                {formik.errors.stockArreglado}
                <br />
                {formik.errors.descripcion}
                <br />
                {formik.errors.codigoProducto}
                <br />
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
                htmlFor="codigoProducto"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Código de Producto:
              </label>
              <input
                type="text"
                id="codigoProducto"
                name="codigoProducto"
                // value={selectedProduct?.Codigo || ""}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                  const productCode = e.target.value;
                  const product = products.find(
                    (product) => product.Codigo === productCode
                  );
                  product && setSelectedProduct(product);
                  product || setSelectedProduct(null);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.codigoProducto}
              />
              {formik.touched.codigoProducto && formik.errors.codigoProducto ? (
                <div>{formik.errors.codigoProducto}</div>
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

            {/* // INFORME FECHA (INPUT DISABLED)
              // PRIMERO CARGA EL CÓDIGO DE PRODUCTO
              // LUEGO SE HABILITAN LOS CAMPOS:
              // - STOCK ANTERIOR (STOCK ACTUAL) (PRECARGADO DISABLED)
              // - DESCRIPCIÓN
              // - STOCK ARREGLADO
              // - ARREGLO QUE SE HIZO (NUMERICO) */}

            {/* Campo de Detalle */}
            <div className="mb-4">
              <label
                htmlFor="detalle"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Descripción:
              </label>
              <input
                type="text"
                id="detalle"
                name="detalle"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Campo de Cantidad */}
            <div className="mb-4">
              <label
                htmlFor="stockArreglado"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock Arreglado:
              </label>
              <input
                type="number"
                id="stockArreglado"
                name="stockArreglado"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Campo de OEM Producto */}
            <div className="mb-4">
              <label
                htmlFor="arregloRealizado"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Arreglo realizado (-1, +5, -3…):
              </label>
              <input
                type="number"
                id="arregloRealizado"
                name="arregloRealizado"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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

export default InventoryForm;
