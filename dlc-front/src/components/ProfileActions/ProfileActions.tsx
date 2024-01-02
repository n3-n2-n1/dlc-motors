import { useState } from "react";

function ProfileActions() {
  const [flyerTwo, setFlyerTwo] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState([]);
  const [flyer, setFlyer] = useState(false);

  //Necesitamos este switch falopita, es del dark mode
  // const darkToogle = () => {

  //   return(
  //     <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} absolute h-full w-full flex items-center justify-center`}>
  //     <DarkModeToggle onToggle={setIsDarkMode} />
  //   </section>
  //   )
  // }

  return (
    <div className="relative inline-block text-left">
    <div
      className="group bg-slate-900 rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => setFlyerTwo(!flyerTwo)}
    >
      <span>
        <svg
          className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 10 30 10"
          fill="currentColor"
          aria-hidden="true"
        >
            <mask
              id="mask0_4_4471"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="30"
              height="30"
            >
              <rect width="30" height="30" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_4_4471)">
              <path
                d="M7.3125 21.375C8.375 20.5625 9.5625 19.9217 10.875 19.4525C12.1875 18.9842 13.5625 18.75 15 18.75C16.4375 18.75 17.8125 18.9842 19.125 19.4525C20.4375 19.9217 21.625 20.5625 22.6875 21.375C23.4167 20.5208 23.9846 19.5521 24.3913 18.4688C24.7971 17.3854 25 16.2292 25 15C25 12.2292 24.0263 9.86958 22.0788 7.92125C20.1304 5.97375 17.7708 5 15 5C12.2292 5 9.87 5.97375 7.9225 7.92125C5.97417 9.86958 5 12.2292 5 15C5 16.2292 5.20333 17.3854 5.61 18.4688C6.01583 19.5521 6.58333 20.5208 7.3125 21.375ZM15 16.25C13.7708 16.25 12.7342 15.8283 11.89 14.985C11.0467 14.1408 10.625 13.1042 10.625 11.875C10.625 10.6458 11.0467 9.60917 11.89 8.765C12.7342 7.92167 13.7708 7.5 15 7.5C16.2292 7.5 17.2658 7.92167 18.11 8.765C18.9533 9.60917 19.375 10.6458 19.375 11.875C19.375 13.1042 18.9533 14.1408 18.11 14.985C17.2658 15.8283 16.2292 16.25 15 16.25ZM15 27.5C13.2708 27.5 11.6458 27.1717 10.125 26.515C8.60417 25.8592 7.28125 24.9688 6.15625 23.8438C5.03125 22.7188 4.14083 21.3958 3.485 19.875C2.82833 18.3542 2.5 16.7292 2.5 15C2.5 13.2708 2.82833 11.6458 3.485 10.125C4.14083 8.60417 5.03125 7.28125 6.15625 6.15625C7.28125 5.03125 8.60417 4.14042 10.125 3.48375C11.6458 2.82792 13.2708 2.5 15 2.5C16.7292 2.5 18.3542 2.82792 19.875 3.48375C21.3958 4.14042 22.7188 5.03125 23.8438 6.15625C24.9688 7.28125 25.8592 8.60417 26.515 10.125C27.1717 11.6458 27.5 13.2708 27.5 15C27.5 16.7292 27.1717 18.3542 26.515 19.875C25.8592 21.3958 24.9688 22.7188 23.8438 23.8438C22.7188 24.9688 21.3958 25.8592 19.875 26.515C18.3542 27.1717 16.7292 27.5 15 27.5Z"
                fill="#3B4758"
              />
            </g>
          </svg>
        </span>
        {/*
        Item active: "text-gray-600", Item inactive: "text-gray-400"
            */}
        <svg
          className={
            flyerTwo === true
              ? "transform rotate-180 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
              : "ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        className={
          flyerTwo
            ? "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            : "hidden"
        }
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden bg-slate-400">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 bg-red">
            <a
              href="#"
              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
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
                <p className="text-base font-medium text-gray-900">Salir</p>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileActions;
