import React from 'react'


const Dashcards = () => {
  return (
    <div className="w-full max-w-1xl">
    <div className="-mx-2 md:flex">
      <div className="w-full md:w-1/1 px-2">
        <div className="rounded-lg shadow-sm mb-4">
          <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative z-10">
              <h4 className="text-sm uppercase text-gray-500 leading-tight">Users</h4>
              <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">3,682</h3>
              <p className="text-xs text-green-500 leading-tight">▲ 57.1%</p>
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart1" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/1 px-2">
        <div className="rounded-lg shadow-sm mb-4">
          <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative z-10">
              <h4 className="text-sm uppercase text-gray-500 leading-tight">Subscribers</h4>
              <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">11,427</h3>
              <p className="text-xs text-red-500 leading-tight">▼ 42.8%</p>
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart2" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/1 px-2">
        <div className="rounded-lg shadow-sm mb-4">
          <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative z-10">
              <h4 className="text-sm uppercase text-gray-500 leading-tight">Comments</h4>
              <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">8,028</h3>
              <p className="text-xs text-green-500 leading-tight">▲ 8.2%</p>
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart3" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashcards