import React from "react";
import ChartDash from "../../components/Chart/Chart";
import { MyClass } from "../../components/Chart/Chart2";
import ProfileActions from "../../components/ProfileActions/ProfileActions";
import PieChart from "../../components/Chart/Chart3";
import ProfitChart from "../../components/Chart/Chart4";

function Home() {
  return (
    <main className="bg-gray-900 sm:p-6 space-y-6 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 border-gray-800 h-screen overflow-y-auto lg:block hidden">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            DLC MOTORS
          </h1>
          <h2 className="text-gray-300 ml-0.5">Gestión Íntegra de Productos</h2>
        </div>
        <div className="justify-center">
          <div className="mt-6">
            <ProfileActions />
          </div>
        </div>
      </div>

      <section className="w-full">
        <div className="pt-6">
          <div className="w-full grid grid-cols-2 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    $45,385
                  </span>
                  <h3 className="text-base font-normal text-gray-400">
                    Ventas durante la ultima semana
                  </h3>
                </div>
                <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                  12.5%
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div id="main-chart"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Masonry-style grid for MyClass */}
      <section className="grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        <MyClass />
        <MyClass />
        <MyClass />
        <MyClass />
        {/* Add more MyClass components as needed */}
      </section>

      <section className="grid md:grid-cols-3 xl:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
          Acquisition Overview
        </h3>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Top Channels
                </th>
                <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Users
                </th>
                <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Organic Search
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  5,649
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">30%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div className="bg-cyan-600 h-2 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Referral
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  4,025
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">24%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div className="bg-orange-300 h-2 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Direct
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  3,105
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">18%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div className="bg-teal-400 h-2 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Social
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  1251
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">12%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div className="bg-pink-600 h-2 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Other
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  734
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">9%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div className="bg-indigo-600 h-2 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                  Email
                </th>
                <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                  456
                </td>
                <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">7%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div className="bg-purple-500 h-2 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <PieChart />

      </section>
    </main>
  );
}

export default Home;
