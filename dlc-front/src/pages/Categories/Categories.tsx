import { useState, useEffect } from "react";
import jsonData from '../../mocks/mocks.json'

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    try {
      // Extrigo productosss
      const uniqueCategories = [...new Set(jsonData.products.map(product => product.Rubro))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  return (
    <div className = "bg-gray-900 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-5">

    <div className="bg-gray-800 p-6 shadow-lg text-white">
      <h2 className="text-3xl font-extrabold mb-6">Categorías:</h2>
      <div className="overflow-hidden overflow-y-scroll scroll-smooth max-h-[840px]">
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="border-b border-gray-700 py-4">
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
          </div>
  );
  
};

export default Categories;
