// Importa las librerías necesarias
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createMovement } from "../../utils/Handlers/Handlers";
import { Link } from "react-router-dom";
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
      alert("Creado");
      console.log(values);
    },
  });

  // Estado para manejar el producto seleccionado
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  // Establecer el valor de 'date' y 'updatedStock' en el estado de Formik
  useEffect(() => {
    formik.setFieldValue("fecha", new Date().toLocaleString());
    formik.setFieldValue("tipoMov", "Inventario");
    formik.setFieldValue("codOEM", selectedProduct?.CodOEM);
    formik.setFieldValue("desc", selectedProduct?.Producto);
    formik.setFieldValue("stock", selectedProduct?.Stock);
  }, [selectedProduct]);

  useEffect(() => {
    if (formik.values.stockAct !== null && selectedProduct !== null) {
      const arreglo = formik.values.stockAct - selectedProduct.Stock;
      formik.setFieldValue("arreglo", arreglo);
    }
  }, [formik.values.stockAct]);

  return (
    <div className="bg-gray-900 w-full flex-shrink-0 h-screen lg:block hidden pt-6 overflow-y-auto">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="mr-6 flex-row">
          <h1 className="text-3xl mb-4 text-white font-weight-300">
            Inventario
          </h1>
          <div className="bg-white rounded rounded-full justify-center hover:bg-blue-700">
          <div className="">
            <Link to="/historyView">
              <button className="p-3 text-md text-gray-800 font-bold hover:text-white">
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
                htmlFor="codigoInt"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Código de Producto:
              </label>
              <input
                type="text"
                id="codigoInt"
                name="codigoInt"
                // value={selectedProduct?.Codigo || ""}
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
                // value={formik.values.codigoInt}
              />
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

            {/* Campo de Cantidad */}
            <div className="mb-4">
              <label
                htmlFor="stockAct"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock Arreglado:
              </label>
              <input
                type="number"
                id="stockAct"
                name="stockAct"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Arreglo realizado (-1, +5, -3…):
              </label>
              <input
                type="number"
                id="arreglo"
                name="arreglo"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
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
