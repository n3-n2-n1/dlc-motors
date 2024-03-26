import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../../utils/cloudinaryTool";
import { NewIProduct } from "../../Interfaces/Products";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct } from "../../utils/Handlers/Handlers";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";

const validationSchema = Yup.object({
  codigoInt: Yup.string().required("Requerido"),
  codOEM: Yup.string().required("Requerido"),
  SKU: Yup.string().required("Requerido"),
  descripcion: Yup.string().required("Requerido"),
  rubro: Yup.string().required("Requerido"),
  origen: Yup.string().required("Requerido"),
  marcasCompatibles: Yup.array()
    .of(Yup.string().required("Requerido"))
    .min(1, "Se requiere al menos una marca compatible")
    .required("Requerido"),
  stock: Yup.number().required("Requerido"),
  imagen: Yup.mixed(),
  contadorDevoluciones: Yup.number(),
  esKit: Yup.boolean(),
  kit: Yup.array().of(Yup.number()),
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
      SKU: "",
      descripcion: "",
      rubro: "",
      origen: "",
      marcasCompatibles: [],
      newCompatibleBrand: brands[0] || "",
      stock: null,
      imagen: null,
      contadorDevoluciones: 0,
      esKit: false,
      kit: [],
      newKitNumber: 0,
      check: "Si",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const imageUrl = await uploadImageToCloudinary(values.imagen);
        console.log("URL de la imagen cargada:", imageUrl);
        toast.success("Imagen cargada con éxito");

        let updatedValues = {
          ...values,
          imagen: imageUrl,
        };

        if (!updatedValues.esKit) {
          updatedValues = {
            ...updatedValues,
            kit: 0,
          };
        }

        console.log("Valores del formulario actualizados:", updatedValues);
        createProduct(updatedValues);

        toast.success("Producto cargado con éxito");
        formik.resetForm();
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
    <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block p-6 transition-all duration-300">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between bg-dark-gray">
        <div className="mr-6 flex-row transition-all du">
          <section className="pb-2">
          <Navbar title={"Agregar Producto"} subtitle={"Agrega productos con sus propiedades."} />

          </section>
          <form
            onSubmit={formik.handleSubmit}
            className="dark:bg-gray-900 bg-white text-black dark:text-white p-4 rounded-md shadow-md transition-colors duration-300"
          >
            <div className="mb-4">
              <label
                htmlFor="codigoInt"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Código Interno
              </label>
              <input
                id="codigoInt"
                name="codigoInt"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Código OEM
              </label>
              <input
                id="codOEM"
                name="codOEM"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                htmlFor="SKU"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Código Tango (SKU)
              </label>
              <input
                id="SKU"
                name="SKU"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                onChange={formik.handleChange}
                value={formik.values.SKU}
              />
              {formik.touched.SKU && formik.errors.SKU ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.SKU}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Descripcion
              </label>
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Rubro
              </label>
              <select
                id="rubro"
                name="rubro"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Origen
              </label>
              <select
                id="origen"
                name="origen"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Marcas Compatibles
              </label>
              <div className="flex items-center mb-2">
                <select
                  id="newCompatibleBrand"
                  name="newCompatibleBrand"
                  value={formik.values.newCompatibleBrand}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                  className="w-full max-w-xs ml-2 rounded-full bg-black font-semibold font-m dark:bg-blue-500 hover:bg-gray-800 dark:text-gray-200 text-white py-2 px-4 dark:hover:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-800"
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
                  <p className="block text-sm font-semibold text-gray-100 dark:text-gray-300 w-32">
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
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.stock}
                </div>
              ) : null}
            </div>

            {/* // Campo para subir imágen */}

            <div className="mb-4">
              <label
                htmlFor="contadorDevoluciones"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
              >
                Rotas o Devueltas (No obligatorio)
              </label>
              <input
                type="number"
                id="contadorDevoluciones"
                name="contadorDevoluciones"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
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
                htmlFor="esKit"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 pt-1  "
              >
                ¿Es kit?
              </label>
              <input
                type="checkbox"
                id="esKit"
                name="esKit"
                checked={formik.values.esKit}
                onChange={formik.handleChange}
                className="mr-4 mt-1 block p-2 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-gray-100 dark:bg-gray-700 text-white"
              />
              {formik.touched.esKit && formik.errors.esKit ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.esKit}
                </div>
              ) : null}
            </div>

            {formik.values.esKit && (
              <div className="mb-4">
                <label
                  htmlFor="kit"
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
                >
                  Unidades para kit
                </label>
                <div className="flex items-center mb-2">
                  <input
                    min={0}
                    type="number"
                    id="newKitNumber"
                    name="newKitNumber"
                    onChange={formik.handleChange}
                    className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
                    />
                  <button
                    type="button"
                    className="bg-blue-500 text-white w-full max-w-xs ml-2 py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-800"
                    onClick={() => {
                      const newNumber = Number(formik.values.newKitNumber);
                      if (newNumber && !formik.values.kit.includes(newNumber)) {
                        formik.setFieldValue("kit", [
                          ...formik.values.kit,
                          newNumber,
                        ]);
                        formik.setFieldValue("newKitNumber", "");
                      }
                    }}
                  >
                    Agregar nuevo kit
                  </button>
                </div>
                {formik.values.kit.map((number, index) => (
                  <div key={index} className="flex gap-1 mb-1 ml-2">
                    <p className="block text-sm font-semibold text-gray-100 dark:text-gray-300 w-8">
                      {number}
                    </p>
                    <button
                      type="button"
                      className="bg-red-500 text-white text-xs ml-2 py-1 px-2 rounded-md hover:bg-red-600"
                      onClick={() => {
                        const newNumbers = [...formik.values.kit];
                        newNumbers.splice(index, 1);
                        formik.setFieldValue("kit", newNumbers);
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
                {formik.touched.kit && formik.errors.kit ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.kit}
                  </div>
                ) : null}
              </div>
            )}

            {/* Campo para cargar la imagen */}
            <div className="mb-4">
              <label
                htmlFor="imagen"
                className="block text-sm font-semibold text-gray-600 dark:text-gray-100"
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
                  setImagePreview(URL.createObjectURL(file));
                }}
                className="mt-1 block w-full p-2 border text-white border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
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
                <h1 className="block text-lg font-semibold text-gray-600 dark:text-gray-100">
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
              className="bg-black font-semibold font-m dark:bg-blue-500 hover:bg-gray-800 dark:text-gray-200 text-white py-2 px-4 rounded-full dark:hover:bg-blue-600"
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
