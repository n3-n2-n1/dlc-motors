import React, { useEffect } from "react";
import { HistorialErrorTable } from "../TableMoves/TableMoves";

const ScrollNot = () => {
  useEffect(() => {
    return () => {};
  }, []);

  
  return (
    <div className="row-span-3 bg-gray-600 shadow rounded-lg">
      <div className="text-white flex items-center bg-gray-700 justify-between px-6 py-5 font-semibold border-b border-gray-100">
        <span>Ultimos Movimientos</span>
        
        <button
          type="button"
          className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span className="p-1">

          Ordenar 
          </span>
          <div className="mt-1">

          <svg
            className="-mr-1 ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          </div>

        </button>

      </div>
      <div className="overflow-y-auto">
        <ul className="p-6 space-y-6">
          <li className="flex items-center">
            <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
              <img
                src="#"
                alt=""
              />
            </div>
            <span className="text-gray-100">Polea Volkswagen</span>
            <span className="ml-auto font-semibold text-white">Devolución</span>
          </li>
        </ul>
      </div>

      <div className="overflow-y-auto">
        <ul className="p-6 space-y-6">
          <li className="flex items-center">
            <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
              <img
                src="#"
                alt=""
              />
            </div>
            <span className="text-gray-100">Polea Volkswagen</span>
            <span className="ml-auto font-semibold text-white">Devolución</span>
          </li>
        </ul>
      </div>

      <div className="overflow-y-auto">
        <ul className="p-6 space-y-6">
          <li className="flex items-center">
            <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
              <img
                src="#"
                alt=""
              />
            </div>
            <span className="text-gray-100">Polea Volkswagen</span>
            <span className="ml-auto font-semibold text-white">Devolución</span>
          </li>
        </ul>
      </div>

      <div className="overflow-y-auto">
        <ul className="p-6 space-y-6">
          <li className="flex items-center">
            <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
              <img
                src="#"
                alt=""
              />
            </div>
            <span className="text-gray-100">Polea Volkswagen</span>
            <span className="ml-auto font-semibold text-white">Devolución</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScrollNot;
