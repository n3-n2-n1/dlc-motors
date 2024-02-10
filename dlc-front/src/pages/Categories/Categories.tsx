import { useState, useEffect } from "react";
import { paths } from "../../routes/paths";
import { Link } from "react-router-dom";

import { useSearchContext } from "../../contexts/SearchContext";

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { products } = useSearchContext();

  useEffect(() => {
    try {
      const uniqueCategories = [...new Set(products.map(product => product.Rubro))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  return (
    <div className="bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden ">
      <div className="bg-gray-900 p-6 shadow-lg text-white">
        <h2 className="text-4xl">Rubros</h2>
        <div className="overflow-auto max-h-[840px]">
        <ul>
            {categories.map((category, index) => (
              <div key={index} className="flex flex-row justify-between items-center border-b border-gray-700 py-4 mr-5">
                <li className="text-xl">
                  {category}
                </li>
                <Link to={`${paths.products}/:${category}`}>
                  <button className="bg-blue-700 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded rounded-2xl">
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
