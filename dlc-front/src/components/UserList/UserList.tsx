// UserList.tsx
import React from "react";

const UserList: React.FC = () => {
  return (
    <div className="xl:w-768 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto lg:block hidden p-5">
      <div className="text-xs text-gray-400 tracking-wider">USERS</div>
      <div className="relative mt-2">
        <input
          type="text"
          className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
          placeholder="Search"
        />
        <svg
          viewBox="0 0 24 24"
          className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <div className="space-y-4 mt-3">
        <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
          <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
            <img src="#" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
            Kathyrn Murphy
          </div>
          <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md">
              Design
            </div>
            <div className="ml-auto text-xs text-gray-500">$1,902.00</div>
          </div>
        </button>
        <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none">
          <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
            <img src="#" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
            Mert Cukuren
          </div>
          <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md">
              Sales
            </div>
            <div className="ml-auto text-xs text-gray-500">$2,794.00</div>
          </div>
        </button>
        <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
          <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
            <img src="#" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
            Albert Flores
          </div>
          <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-yellow-100 text-yellow-600 rounded-md">
              Marketing
            </div>
            <div className="ml-auto text-xs text-gray-400">$0.00</div>
          </div>
        </button>
        <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
          <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
            <img src="#" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
            Jane Cooper
          </div>
          <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md">
              Design
            </div>
            <div className="ml-auto text-xs text-gray-500">$762.00</div>
          </div>
        </button>
        <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
          <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
            <img src="#" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
            Ronald Richards
          </div>
          <div className="flex items-center w-full">
            <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md">
              Sales
            </div>
            <div className="ml-auto text-xs text-gray-400">$0.00</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserList;
