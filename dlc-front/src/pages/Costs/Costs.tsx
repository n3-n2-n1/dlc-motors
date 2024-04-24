import Navbar from "../../components/Navbar/Navbar";
import { IMPORTEDCOLUMNS } from "../../components/columns/Columns";
import ImportedTableChart from "../../components/Tables/ImportedTableChart";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useFetchNodes } from "../../nodes/productNodes";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Costs = () => {
  const { category } = useParams();
  const nodes = useFetchNodes();

  return (
    <>
      <PageTitle title="DLC Motors • Costos" />
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen overflow-auto text-sm p-6 transition-colors duration-300 select-none">
        <Navbar title="Costos" subtitle="" />
        {nodes.length > 0 ? (
          <ImportedTableChart
            columns={IMPORTEDCOLUMNS}
            data={nodes}
            category={category}
          />
        ) : (
          <div className="bg-gray-900">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Costs;
