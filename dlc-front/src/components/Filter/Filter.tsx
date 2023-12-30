import { useState } from 'react';

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline-block text-left mb-3'>
      <div className="flex items-center">

        <button
          onClick={toggleDropdown}
          className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0 mx-auto"
        >
          Filtrar
          <svg
            viewBox="0 0 24 24"
            className={`w-4 ml-1.5 ${isOpen ? 'transform rotate-180' : ''} text-gray-400 dark:text-gray-600`}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

      </div>

      {isOpen && (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 z-50">
          <div className="py-1">
            {/* Contenido del menú desplegable */}
            <button
              onClick={() => console.log('30 días')}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Rubro
            </button>
            <button
              onClick={() => console.log('Artículos: 20')}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Origen
            </button>

            <button
              onClick={() => console.log('Artículos: 20')}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Fecha
            </button>
            <button
              onClick={() => console.log('Artículos: 20')}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Origen
            </button>
            {/* Agrega más elementos del menú según tus necesidades */}
          </div>
        </div>
      )}
    </div>
  );
};
export default Filter;
