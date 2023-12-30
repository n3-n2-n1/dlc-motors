function Navbar() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 text-sm z-10 sm:flex-row">
      <div className="h-16 w-full border-b border-gray-200 dark:border-gray-800 px-4 md:px-10 z-10">
        <div className="flex h-full text-gray-600 dark:text-gray-400 sm:flex-row">
          <a
            href="#"
            className="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
          >
            Productos
          </a>
          <a
            href="#"
            className="cursor-pointer h-full border-b-2 border-transparent inline-flex mr-8 items-center"
          >
            Usuarios
          </a>
          <a
            href="#"
            className="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
          >
            Movimientos
          </a>
          <a
            href="#"
            className="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center"
          >
            Cod. OEM
          </a>
        </div>
        <div className="ml-auto flex items-center space-x-7">
          <button className="flex items-center">
            <span className="relative flex-shrink-0">
              <img className="w-7 h-7 rounded-full" src="" alt="profile" />
              <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
            </span>
            <span className="ml-2">Tester</span>
            <svg
              viewBox="0 0 24 24"
              className="w-4 ml-1 flex-shrink-0"
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
      </div>
    </div>
  );
}

export default Navbar;
