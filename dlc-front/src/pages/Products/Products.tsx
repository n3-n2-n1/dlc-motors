import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useFetchNodes } from "../../nodes/productNodes";
import { PRODUCTCOLUMNS } from "../../components/columns/Columns";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import ProductTableChart from "../../components/Tables/ProductTableChart";
import Dashcards from "../../components/Dashcards/Dashcards";
import Loader from "../../components/Loader/Loader";
import PageTitle from "../../components/PageTitle/PageTitle";
import ExportButton from "../../utils/downloadProducts";
import { useAuth } from "../../contexts/AuthContext";
import useRoleCheck from "../../hooks/useRoleCheck";

const Products = () => {
  const { category } = useParams();
  const nodes = useFetchNodes();
  const { user } = useAuth(); // Acceso al usuario desde el contexto

  const isFactoryOperator = useRoleCheck(user?.role, ["Operador de fábrica"]);
  const isSupervisor = useRoleCheck(user?.role, ["Supervisor"]);
  const isClient = useRoleCheck(user?.role, ["Cliente"]);

  const edit = () => {}
 
  

  return (
    <>
      <PageTitle title="DLC Motors • Productos" />
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex overflow-y-hidden text-sm transition-all duration-300">
        <div className="flex-grow h-full flex flex-col">
          <div className="flex-grow">
            <div className="flex items-center sm:p-6 md:p-4 pt-1 justify-between ">
              <Navbar title="Productos" subtitle="Visualizá productos" />

              {!isClient && !isSupervisor && !isFactoryOperator && (
                <section className="flex items-center gap-4">
                  <Dashcards
                    buttons={[
                      {
                        text: "Agregar Producto",
                        link: "/productos/agregar",
                        action: edit,
                      },
                    ]}
                  />
                  <Link to={paths.massive}>
                    <div className="flex flex-col items-center justify-center bg-black text-white rounded-full shadow-lg md:shadow-xl px-4 hover:bg-gray-700 hover:text-white dark:bg-blue-600 select-none dark:hover:bg-blue-800">
                      <h3 className="text-m font-semibold my-2 rounded-2xl hover:text-white select-none">
                        Agregar Masivo
                      </h3>
                    </div>
                  </Link>
                  {/* <ExportButton /> */}
                  {/* <AnualExport /> */}
                </section>
              )}
            </div>
            <section className="p-4 transition-all ">
              {nodes.length > 0 ? (
                <ProductTableChart
                  columns={PRODUCTCOLUMNS}
                  data={nodes}
                  category={category}
                />
              ) : (
                <div className="bg-gray-900">
                  <Loader />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* {!isAdmin && (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen  justify-center items-center flex overflow-y-hidden text-2xl transition-all duration-30">
          <p className="text-gray-300">No hay nada que ver aquí!</p>
        </div>
      )} */}
    </>
  );
};

export default Products;
