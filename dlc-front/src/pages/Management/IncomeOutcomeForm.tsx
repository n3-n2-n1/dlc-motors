import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required("* Campo requerido"),
  detalle: Yup.string(),
  cantidad: Yup.number().required("* Campo requerido"),
  oemProducto: Yup.string().required("* Campo requerido").uppercase(),
  importacion: Yup.string().when("observaciones", ([observaciones], schema) => {
    return observaciones === "Importación"
      ? schema.required("* Campo requerido")
      : schema;
  }),
});

import { IProduct } from "../../components/Actions/Actions";

interface IncomeOutcomeFormProps {
  observationsList: string[];
  products: IProduct[];	
}

const IncomeOutcomeForm: React.FC<IncomeOutcomeFormProps> = ({
  observationsList,
  products
}) => {
  const initialValues = {
    observaciones: "",
    detalle: "",
    cantidad:  1,
    oemProducto: "",
    importacion: "",
  };

  console.log(products)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form className="bg-gray-800 text-white p-4 rounded-md shadow-md">
        <div className="mb-4 w-full">
          <a>ENTRADA REGISTRO</a>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-800">
            Observaciones:
          </label>
          <Field
            as="select"
            id="observaciones"
            name="observaciones"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 text-gray-800"
          >
            <option value="">Seleccione...</option>
            {observationsList.map((observation, index) => (
              <option key={index} value={observation}>
                {observation}
              </option>
            ))}
          </Field>
          <ErrorMessage name="observaciones" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        {values.observaciones === "Importación" && (
          <div className="mb-4">
            <label htmlFor="importacion" className="block text-sm font-medium text-white-600 dark:text-white-300">
              Número de importación:
            </label>
            <Field
              type="text"
              id="importacion"
              name="importacion"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <ErrorMessage name="importacion" component="div" className="text-red-500 text-sm mt-1" />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="detalle" className="block text-sm font-medium text-white-600 dark:text-white-300">
            Detalle:
          </label>
          <Field
            type="text"
            id="detalle"
            name="detalle"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <ErrorMessage name="detalle" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div className="mb-4">
          <label htmlFor="cantidad" className="block text-sm font-medium text-white-600 dark:text-white-300">
            Cantidad:
          </label>
          <Field
            type="number"
            id="cantidad"
            name="cantidad"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <ErrorMessage name="cantidad" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div className="mb-4">
          <label htmlFor="oemProducto" className="block text-sm font-medium text-white-600 dark:text-white-300">
            OEM Producto:
          </label>
          <Field
            type="text"
            id="oemProducto"
            name="oemProducto"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              const productCode = e.target.value;
              const product = products.find((p) => p.Codigo === productCode);
              if (product) {
                console.log(product);
              } else {
                console.log('Product not found');
              }
            }}
          />
          <ErrorMessage name="oemProducto" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        {/* Botón de Agregar */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Agregar
        </button>
      </Form>
      )}
    </Formik>
  );
};

export default IncomeOutcomeForm;
