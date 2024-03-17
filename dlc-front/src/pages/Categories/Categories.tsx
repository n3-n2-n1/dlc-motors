import { useState, useEffect } from "react";
import { paths } from "../../routes/paths";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchContext } from "../../contexts/SearchContext";

const Categories = () => {
  // const [categories, setCategories] = useState<string[]>([]);
  const { categories } = useSearchContext();

  return (
<div className="bg-gray-100 dark:bg-gray-900 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto">
  <div className="bg-white dark:bg-gray-900 p-4 md:p-6 shadow-lg dark:text-white">
    <Navbar title="Rubros" subtitle='' />
    <div className="overflow-auto max-h-[890px] scrollbar-thin scrollbar-thumb-rounded">
      <ul>
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2 md:py-4 mr-2 md:mr-5"
          >
            <li className="text-lg md:text-xl mb-2 md:mb-0 text-gray-900 dark:text-white">{category}</li>
            <Link to={`${paths.products}/${category}`}>
              <button className="bg-black hover:bg-blue-700 dark:hover:bg-gray-700 dark:bg-[#3496CB] text-white font-bold py-2 px-4 md:px-8 rounded-2xl">
                Ir
              </button>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default Categories;
