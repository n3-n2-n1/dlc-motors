import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../../utils/cloudinaryTool";
import { NewIProduct } from "../../Interfaces/Products";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct } from "../../utils/Handlers/Handlers";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  codigoInt: Yup.string().required("Requerido"),
  codOEM: Yup.string().required("Requerido"),
  codTango: Yup.string().required("Requerido"),
  descripcion: Yup.string().required("Requerido"),
  rubro: Yup.string().required("Requerido"),
  origen: Yup.string().required("Requerido"),
  marcasCompatibles: Yup.array()
    .of(Yup.string().required("Requerido"))
    .min(1, "Se requiere al menos una marca compatible")
    .required("Requerido"),
  stock: Yup.number().required("Requerido"),
  hasStock: Yup.boolean().required("Requerido"),
  imagen: Yup.mixed(),
  contadorDevoluciones: Yup.number(),
  kit: Yup.boolean(),
  tag: Yup.string().required("Requerido"),
  precio: Yup.number().required("Requerido"),
});

interface AddProductFormProps {
  categories: string[];
  brands: string[];
}

const addProduct: React.FC<AddProductFormProps> = ({ categories, brands }) => {
  const [imagePreview, setImagePreview] = useState("");

  const formik = useFormik<NewIProduct>({
    initialValues: {
      codigoInt: "",
      codOEM: "",
      codTango: "",
      descripcion: "",
      rubro: "",
      origen: "",
      marcasCompatibles: [],
      newCompatibleBrand: brands[0] || "",
      stock: null,
      hasStock: false,
      imagen: null,
      contadorDevoluciones: 0,
      kit: false,
      tag: "",
      precio: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const imageUrl = await uploadImageToCloudinary(values.imagen);
        console.log("URL de la imagen cargada:", imageUrl);
        toast.success("Imagen cargada con éxito");

        const updatedValues = {
          ...values,
          imagen: imageUrl,
        };
        console.log("Valores del formulario actualizados:", updatedValues);
        createProduct(updatedValues);

        toast.success("Reporte cargado con éxito");
      } catch (error) {
        console.error("Error en el formulario:", error);
        toast.error("Error al cargar la imagen: " + error);
      }
    },
  });

  const remainingBrands = brands.filter(
    (brand) => !formik.values.marcasCompatibles.includes(brand)
  );

  useEffect(() => {
    formik.setFieldValue("newCompatibleBrand", remainingBrands[0] || "");
  }, [formik.values.marcasCompatibles, formik.setFieldValue, brands]);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-6">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="mr-6 flex-row">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            Agregar Producto
          </h1>
          <h2 className="text-gray-500 mb-4">
            Agrega productos con sus propiedades
            <br />
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="codigoInt"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Codigo Pieza
              </label>
              <input
                id="codigoInt"
                name="codigoInt"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.codigoInt}
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
                Codigo OEM
              </label>
              <input
                id="codOEM"
                name="codOEM"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.codOEM}
              />
              {formik.touched.codOEM && formik.errors.codOEM ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.codOEM}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="codTango"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Codigo Tango
              </label>
              <input
                id="codTango"
                name="codTango"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.codTango}
              />
              {formik.touched.codTango && formik.errors.codTango ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.codTango}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Descripcion
              </label>
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.descripcion}
              />
              {formik.touched.descripcion && formik.errors.descripcion ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.descripcion}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="rubro"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Categoria
              </label>
              <select
                id="rubro"
                name="rubro"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 text-gray-800"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Seleccione...</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {formik.touched.rubro && formik.errors.rubro ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.rubro}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="origen"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Origen
              </label>
              <select
                id="origen"
                name="origen"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 text-gray-800"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Seleccione...</option>
                <option value="Fábrica">Fábrica</option>
                <option value="Nacional">Nacional</option>
                <option value="Importado">Importado</option>
              </select>
              {formik.touched.origen && formik.errors.origen ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.origen}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="marcasCompatibles"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Marcas Compatibles
              </label>
              <div className="flex items-center mb-2">
                <select
                  id="newCompatibleBrand"
                  name="newCompatibleBrand"
                  value={formik.values.newCompatibleBrand}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white disable"
                  disabled={remainingBrands.length === 0}
                >
                  {remainingBrands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="bg-blue-500 text-white w-full max-w-xs ml-2 py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-800"
                  onClick={() => {
                    if (formik.values.newCompatibleBrand) {
                      formik.setFieldValue("marcasCompatibles", [
                        ...formik.values.marcasCompatibles,
                        formik.values.newCompatibleBrand,
                      ]);
                    }
                  }}
                  disabled={remainingBrands.length === 0}
                >
                  Agregar marca compatible
                </button>
              </div>
              {formik.values.marcasCompatibles.map((marca, index) => (
                <div key={index} className="flex gap-1 mb-1 ml-2">
                  <p className="block text-sm font-medium text-gray-100 dark:text-gray-300 w-32">
                    {index + 1} - {marca}
                  </p>
                  <button
                    type="button"
                    className="bg-red-500 text-white text-xs ml-2 py-1 px-2 rounded-md hover:bg-red-600"
                    onClick={() => {
                      const newMarcas = [...formik.values.marcasCompatibles];
                      newMarcas.splice(index, 1);
                      formik.setFieldValue("marcasCompatibles", newMarcas);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
              {formik.touched.marcasCompatibles &&
              formik.errors.marcasCompatibles ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.marcasCompatibles}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.stock}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="hasStock"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                ¿Hay stock?
              </label>
              <input
                id="hasStock"
                name="hasStock"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={
                  formik.values.stock && formik.values.stock > 0 ? "Si" : "No"
                }
                disabled
              />
              {formik.touched.hasStock && formik.errors.hasStock ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.hasStock}
                </div>
              ) : null}
            </div>

            {/* // ! Campo para subir imágen */}

            <div className="mb-4">
              <label
                htmlFor="contadorDevoluciones"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Rotas o Devueltas (No obligatorio)
              </label>
              <input
                type="number"
                id="contadorDevoluciones"
                name="contadorDevoluciones"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.contadorDevoluciones &&
              formik.errors.contadorDevoluciones ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.contadorDevoluciones}
                </div>
              ) : null}
            </div>

            <div className="mb-4 flex flex-row items-center gap-3">
              <label
                htmlFor="kit"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300 pt-1  "
              >
                Kit
              </label>
              <input
                type="checkbox"
                id="kit"
                name="kit"
                checked={formik.values.kit}
                onChange={formik.handleChange}
                className="mr-4 mt-1 block p-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {formik.touched.kit && formik.errors.kit ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.kit}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Código de Barras
              </label>
              <input
                id="tag"
                name="tag"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.tag}
              />
              {formik.touched.tag && formik.errors.tag ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.tag}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="precio"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Precio
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.precio && formik.errors.precio ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.precio}
                </div>
              ) : null}
            </div>

            {/* Campo para cargar la imagen */}
            <div className="mb-4">
              <label
                htmlFor="imagen"
                className="block text-sm font-medium text-gray-200 dark:text-gray-300"
              >
                Imagen:
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
                className="mt-1 block w-full p-2 border border-gray-300 text-white dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
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
                <h1 className="block text-lg font-medium text-gray-200 dark:text-gray-300">
                  Imagen a cargar:
                </h1>
                <img
                  src={imagePreview}
                  alt="Previsualización"
                  className="w-32 rounded-xl"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Agregar Producto
            </button>
          </form>
        </div>
      </div>
      <div className="space-y-4 mt-3 text-gray-300">
        <div></div>
      </div>
    </div>
  );
};

export default addProduct;
