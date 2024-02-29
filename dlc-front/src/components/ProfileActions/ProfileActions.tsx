
import { logoutUser } from "../../utils/Handlers/Handlers";
import { useState } from "react";
import NotificationIcon from "../NotificationIcon/NotificationIcon";

function ProfileActions() {
  const [flyerTwo, setFlyerTwo] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState([]);
  const [flyer, setFlyer] = useState(false);

  return (
    <div className="relative inline-block text-left">
  <div
    className="group bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    onClick={() => setFlyerTwo(!flyerTwo)}
  >
  <NotificationIcon />
  </div>
  <div
    className={
      flyerTwo
        ? "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5"
        : "hidden"
    }
  >
 <div
    className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-5 ${flyerTwo ? "" : "hidden"}`}
  >
    <button className="relative w-full h-full p-3 flex items-start rounded-lg hover:bg-gray-800"
      onClick={logoutUser}
    >
        <a
          href="#"
          className="-m-3 p-3 bg-gray-700 flex items-start rounded-lg hover:bg-gray-800"
        >
          {/* Heroicon name: outline/support */}
          <svg
            className="flex-shrink-0 h-6 w-6 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <div className="ml-4">
            <p className="text-base font-medium text-white">Salir</p>
          </div>
        </a>
      </button>

      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden bg-slate-700">
      <button className="relative bg-gray-700sm:gap-8 sm:p-8 bg-red w-full h-full"
      onClick={logoutUser}
      >
        <a
          href="#"
          className="-m-3 p-3 bg-gray-700 flex items-start rounded-lg hover:bg-gray-800"
        >
          {/* Heroicon name: outline/support */}
          <svg
            className="flex-shrink-0 h-6 w-6 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <div className="ml-4">
            <p className="text-base font-medium text-white">Soporte</p>
          </div>
        </a>
      </button>

    </div>

    </div>


    
    
  </div>
</div>

  );
}

export default ProfileActions;
