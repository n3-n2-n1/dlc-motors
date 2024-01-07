import { useEffect } from "react";

import { NewIProduct } from "../../Interfaces/Products";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createProduct } from "../../utils/Handlers/Handlers";

const validationSchema = Yup.object({
  pieceCode: Yup.string().required("Requerido"),
  OEMCode: Yup.string().required("Requerido"),
  tangoCode: Yup.string().required("Requerido"),
  description: Yup.string().required("Requerido"),
  category: Yup.string().required("Requerido"),
  origin: Yup.string().required("Requerido"),
  compatibleBrands: Yup.array()
  .of(Yup.string().required("Requerido"))
  .min(1, "Se requiere al menos una marca compatible")
  .required("Requerido"),
  stock: Yup.number().required("Requerido"),
  hasStock: Yup.boolean().required("Requerido"),
  picture: Yup.string(), // poner required
  brokenOrReturned: Yup.number(),
  kit: Yup.boolean(),
  tag: Yup.string().required("Requerido"),
  price: Yup.number().required("Requerido"),
});

interface AddProductFormProps {
  categories: string[];
  brands: string[];
}

const addProduct: React.FC<AddProductFormProps> = ({ categories, brands }) => {
  const formik = useFormik<NewIProduct>({
    initialValues: {
      pieceCode: "",
      OEMCode: "",
      tangoCode: "",
      description: "",
      category: "",
      origin: "",
      compatibleBrands: [],
      newCompatibleBrand: brands[0] || "",
      stock: null,
      hasStock: false,
      picture: "picture",
      brokenOrReturned: 0,
      kit: false,
      tag: "",
      price: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      createProduct(values);
    },
  });

  const remainingBrands = brands.filter(
    (brand) => !formik.values.compatibleBrands.includes(brand)
  );

  useEffect(() => {
    formik.setFieldValue("newCompatibleBrand", remainingBrands[0] || "");
  }, [formik.values.compatibleBrands, formik.setFieldValue, brands]);

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
                htmlFor="pieceCode"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Codigo Pieza
              </label>
              <input
                id="pieceCode"
                name="pieceCode"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.pieceCode}
              />
              {formik.touched.pieceCode && formik.errors.pieceCode ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.pieceCode}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="OEMCode"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Codigo OEM
              </label>
              <input
                id="OEMCode"
                name="OEMCode"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.OEMCode}
              />
              {formik.touched.OEMCode && formik.errors.OEMCode ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.OEMCode}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="tangoCode"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Codigo Tango
              </label>
              <input
                id="tangoCode"
                name="tangoCode"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.tangoCode}
              />
              {formik.touched.tangoCode && formik.errors.tangoCode ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.tangoCode}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Descripcion
              </label>
              <input
                id="description"
                name="description"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-700 disabled:text-white"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
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
              {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.category}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="origin"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Origen
              </label>
              <select
                id="origin"
                name="origin"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 text-gray-800"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Seleccione...</option>
                <option value="Fábrica">Fábrica</option>
                <option value="Nacional">Nacional</option>
                <option value="Importado">Importado</option>
              </select>
              {formik.touched.origin && formik.errors.origin ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.origin}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="compatibleBrands"
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
                      formik.setFieldValue("compatibleBrands", [
                        ...formik.values.compatibleBrands,
                        formik.values.newCompatibleBrand,
                      ]);
                    }
                  }}
                  disabled={remainingBrands.length === 0}
                >
                  Agregar marca compatible
                </button>
              </div>
              {formik.values.compatibleBrands.map((marca, index) => (
                <div key={index} className="flex gap-1 mb-1 ml-2">
                  <p className="block text-sm font-medium text-gray-100 dark:text-gray-300 w-32">
                    {index + 1} - {marca}
                  </p>
                  <button
                    type="button"
                    className="bg-red-500 text-white text-xs ml-2 py-1 px-2 rounded-md hover:bg-red-600"
                    onClick={() => {
                      const newMarcas = [...formik.values.compatibleBrands];
                      newMarcas.splice(index, 1);
                      formik.setFieldValue("compatibleBrands", newMarcas);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
              {formik.touched.compatibleBrands &&
              formik.errors.compatibleBrands ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.compatibleBrands}
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
                htmlFor="brokenOrReturned"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Rotas o Devueltas (No obligatorio)
              </label>
              <input
                type="number"
                id="brokenOrReturned"
                name="brokenOrReturned"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.brokenOrReturned &&
              formik.errors.brokenOrReturned ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.brokenOrReturned}
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
                htmlFor="price"
                className="block text-sm font-medium text-gray-100 dark:text-gray-300"
              >
                Precio
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.price}
                </div>
              ) : null}
            </div>

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
