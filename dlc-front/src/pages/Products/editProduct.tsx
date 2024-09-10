import { useParams } from "react-router-dom";
import { useSearchContext } from "../../contexts/SearchContext.tsx";
import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../../utils/cloudinaryTool";
import { NewIProduct } from "../../Interfaces/Products";
import { useFormik } from "formik";
import * as Yup from "yup";
import { modifyProduct } from "../../utils/Handlers/Handlers";
import { toast } from "react-toastify";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  codigoInt: Yup.string().required("Requerido"),
  SKU: Yup.string().required("Requerido"),
  descripcion: Yup.string().required("Requerido"),
  rubro: Yup.string().required("Requerido"),
  origen: Yup.string().required("Requerido"),
  marcasCompatibles: Yup.array()
    .of(Yup.string().required("Requerido"))
    .min(1, "Se requiere al menos una marca compatible")
    .required("Requerido"),
  imagen: Yup.mixed(),
  contadorDevoluciones: Yup.number(),
  esKit: Yup.boolean(),
  kit: Yup.array()
    .of(Yup.number())
    .min(1, "Se requiere al menos una marca compatible")
    .required("Requerido"),
});

interface EditProductFormProps {
  categories: string[];
  brands: string[];
}

const EditProduct: React.FC<EditProductFormProps> = ({ categories, brands }) => {
  const { products } = useSearchContext();
  const { id } = useParams();

  // Buscar el producto a editar
  const productToEdit = products.find((product) => product.codigoInt === id);

  // Estados para manejar la imagen y la carga del producto
  const [imagePreview, setImagePreview] = useState(productToEdit ? productToEdit.imagen : "");
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const [isNewImageUploaded, setIsNewImageUploaded] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setIsProductLoaded(true);
    }
  }, [productToEdit]);

  // Formik para manejar el formulario
  const formik = useFormik<NewIProduct>({
    initialValues: {
      codigoInt: productToEdit ? productToEdit.codigoInt : "",
      codOEM: productToEdit ? productToEdit.codOEM : "",
      SKU: productToEdit ? productToEdit.SKU : "",
      descripcion: productToEdit ? productToEdit.descripcion : "",
      rubro: productToEdit ? productToEdit.rubro : "",
      origen: productToEdit ? productToEdit.origen : "",
      marcasCompatibles: productToEdit ? productToEdit.marcasCompatibles : [],
      newCompatibleBrand: brands[0] || "",
      stock: productToEdit ? productToEdit.stock : "",
      imagen: productToEdit ? productToEdit.imagen : "",
      contadorDevoluciones: productToEdit ? productToEdit.contadorDevoluciones : "",
      esKit: productToEdit ? !!productToEdit.kit : false,
      kit: productToEdit ? productToEdit.kit : [],
      newKitNumber: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Subir la imagen si fue modificada
        let imageUrl = values.imagen;
        if (isNewImageUploaded) {
          imageUrl = await uploadImageToCloudinary(values.imagen);
          toast.success("Imagen cargada con éxito");
        }

        // Modificar el producto con los valores actualizados
        const updatedValues = {
          ...values,
          imagen: imageUrl,
        };
        await modifyProduct(updatedValues);
        toast.success("Producto editado con éxito");
      } catch (error) {
        console.error("Error en el formulario:", error);
        toast.error("Error al editar el producto: " + error);
      }
    },
  });

  // Actualizar el campo newCompatibleBrand según las marcas disponibles
  const remainingBrands = brands.filter(
    (brand) => !formik.values.marcasCompatibles.includes(brand)
  );

  useEffect(() => {
    formik.setFieldValue("newCompatibleBrand", remainingBrands[0] || "");
  }, [formik.values.marcasCompatibles, formik.setFieldValue, brands]);

  if (!isProductLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block p-6 transition-colors duration-300">
      <div className="flex flex-col space-y-6 md:space-y-0 justify-between">
        <div className="mr-6 flex-row outline-none ">
          <h1 className="text-4xl mb-2 dark:text-gray-100 text-gray-600 font-weight-300">
            Editar Producto
          </h1>
          <h2 className="text-gray-700 mb-4 dark:text-gray-100">
            Editando{" "}
            <span className="font-bold text-gray-700 mb-4 dark:text-gray-100">
              {productToEdit?.descripcion}
            </span>
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-md shadow-md"
          >
            {/* Código Interno */}
            <div className="mb-4">
              <label
                htmlFor="codigoInt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Código Interno
              </label>
              <input
                id="codigoInt"
                name="codigoInt"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm"
                value={formik.values.codigoInt}
                disabled
              />
            </div>

            {/* Código OEM */}
            <div className="mb-4">
              <label
                htmlFor="codOEM"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Código OEM
              </label>
              <input
                id="codOEM"
                name="codOEM"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm"
                onChange={formik.handleChange}
                value={formik.values.codOEM}
              />
            </div>

            {/* SKU */}
            <div className="mb-4">
              <label
                htmlFor="SKU"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Código Tango (SKU)
              </label>
              <input
                id="SKU"
                name="SKU"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm"
                onChange={formik.handleChange}
                value={formik.values.SKU}
              />
            </div>

            {/* Descripción */}
            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descripción
              </label>
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm"
                onChange={formik.handleChange}
                value={formik.values.descripcion}
              />
            </div>

            {/* Categoría */}
            <div className="mb-4">
              <label
                htmlFor="rubro"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Categoría
              </label>
              <select
                id="rubro"
                name="rubro"
                className="mt-1 block w-full p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm"
                onChange={formik.handleChange}
                value={formik.values.rubro}
              >
                <option value="">Seleccione...</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Imagen */}
            <div className="mb-4">
              <label
                htmlFor="imagen"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Imagen:
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    formik.setFieldValue("imagen", file);
                    setImagePreview(URL.createObjectURL(file));
                    setIsNewImageUploaded(true);
                  }
                }}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Previsualización de la imagen */}
            {imagePreview && (
              <div className="flex flex-col items-center mb-4 rounded-lg gap-1">
                <h1 className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                  {isNewImageUploaded ? "Imagen a cargar:" : "Imagen actual del producto:"}
                </h1>
                <img src={imagePreview} alt="Previsualización" className="w-32 rounded-xl" />
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Editar Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
