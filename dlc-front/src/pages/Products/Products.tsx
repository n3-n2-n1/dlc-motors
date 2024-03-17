import { useParams } from "react-router-dom";
import Actions from "../../components/Actions/Actions";
import Navbar from "../../components/Navbar/Navbar";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";
import TableList from "../../components/TableList/TableList";
import Charted from "../../components/MockTable/MockTable";
import { useFetchNodes } from "../../nodes/productNodes";
import { useState, useEffect } from "react";
import { PRODUCTCOLUMNS } from "../../components/columns/Columns";
import HotButton from "../../components/HotButton/hotButton";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import ProductTableChart from "../../components/Tables/ProductTableChart";
import Dashcards from "../../components/Dashcards/Dashcards";

const Products = () => {
  
  const { category } = useParams();
  const nodes = useFetchNodes();

  const edit = () => {
    console.log('editar?')
  }

  return (

<div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex overflow-hidden text-sm">
  <div className="flex-grow h-full flex flex-col">
    <div className="flex-grow">
      <div className="flex items-center sm:p-6 md:p-4 pt-1 justify-between">
        <Navbar title="Listado de Productos" subtitle="Visualizá productos" />

        <section className="flex items-center gap-4">

        <Dashcards buttons={[{ text: "Agregar Producto", action: edit, link: '/productos/agregar' }]} />
        <Link to={paths.massive}>
          <div className="flex flex-col items-center justify-center bg-black text-white rounded-full shadow-lg md:shadow-xl px-3 hover:bg-gray-700 hover:text-white dark:bg-blue-700">
            <h3 className="text-lg font-normal my-2 rounded rounded-2xl hover:text-white">Agregar Masivo</h3>
          </div>
        </Link>
        </section>

      </div>

      <section className="p-4">
        {nodes.length > 0 ? (
          <ProductTableChart
            columns={PRODUCTCOLUMNS}
            data={nodes}
            category={category}
          />
        ) : (
          <div className="text-gray-900 dark:text-gray-300">Loading...</div>
        )}
      </section>
    </div>
  </div>
</div>

  );
};

export default Products;
