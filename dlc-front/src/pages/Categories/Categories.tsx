import { useState, useEffect } from "react";
import { paths } from "../../routes/paths";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchContext } from "../../contexts/SearchContext";
import PageTitle from "../../components/PageTitle/PageTitle";
const Categories = () => {
  // const [categories, setCategories] = useState<string[]>([]);
  const { categories } = useSearchContext();

  return (
    <>
    <PageTitle title="DLC Motors • Rubros" />

    <div className="bg-gray-100 dark:bg-gray-900 w-full flex-shrink-0 border-r border-gray-500 dark:border-gray-800 h-screen overflow-y-hidden transition-colors duration-300 select-none">
      <div className=" dark:bg-gray-900 p-4 md:p-6 shadow-lg dark:text-white pt-4">
        <Navbar title="Rubros" subtitle="" />
        <div className="overflow-auto max-h-[870px] scrollbar-thin scrollbar-thumb-rounded transition-colors duration-300 pt-2">
          <ul>
            {categories.map((category, index) => (
              <Link to={`${paths.products}/${category}`}>
                <div
                  key={index}
                  className="hover:text-gray-700 flex flex-col md:flex-row justify-between items-center border-b border-gray-500 dark:border-gray-700 py-2 md:py-4 md:mr-5 transition-all duration-500 ease-in-out transform hover:scale-95 shadow-lg cursor-pointer"
                >
                  <li className="text-lg md:text-xl mb-2 ml-4 md:mb-0 text-gray-900 dark:text-white transition-all duration-500">
                    {category}
                  </li>
                  <button className="py-2 px-4 md:px-8 rounded-2xl transition-transform duration-500 hover:rotate-90">
                    {" "}
                    {/* Añade rotación al botón */}
                    <div className="dark:hidden">
                      <svg
                        width="19px"
                        height="19px"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        className="bi bi-arrow-right"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="hidden dark:block">
                      <svg
                        width="19px"
                        height="19px"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                        className="bi bi-arrow-right"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                  </button>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Categories;
