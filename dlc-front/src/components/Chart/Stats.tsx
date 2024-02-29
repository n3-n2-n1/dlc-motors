import React from 'react';

interface Stats {
    title?: string;
    value?: string;
    percentage?: number;
    icon?: void;
}


const Stats = ({ title, value, percentage, icon }) => {
  return (
    <div className="p-4 transition-shadow bg-[#030511] border rounded-lg shadow-xl drop-shadow-xl hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-2">
          <span className="text-gray-200 font-bold text-xl">{title}</span>
          <span className="text-lg text-gray-300 font-semibold">{value}</span>
        </div>
        <div className="p-2 rounded-md">
          {icon} {/* Icono SVG */}
        </div>
      </div>
      <div className='pt-2'>
        <span className={`inline-block px-2 text-sm ${percentage >= 0 ? 'bg-green-300' : 'bg-red-300'} text-gray-900 font-bold rounded`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default Stats;
