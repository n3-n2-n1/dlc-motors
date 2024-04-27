import React from "react";
import { Link } from "react-router-dom";
interface Stats {
  title?: string;
  value?: string;
  percentage?: number;
  icon?: void;
  link?: any;
}

const Stats = ({ title, value, percentage, icon, link }) => {
  return (
    <Link to={link}>
    <div className="p-4 transition-shadow bg-gray-200 dark:bg-gray-800 border rounded-lg shadow-xl drop-shadow-xl hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-700 dark:text-gray-200 font-bold text-xl">
            {title}
          </span>
          <span className="text-gray-700 text-lg dark:text-gray-300 font-semibold">
            {value}
          </span>
        </div>
        <div className="p-2 rounded-md dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <mask
              id="mask0_73_3859"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="currentColor" />
            </mask>
            <g mask="url(#mask0_73_3859)">
              <path
                d="M10 16H11C11 16.2833 11.096 16.5207 11.288 16.712C11.4793 16.904 11.7167 17 12 17C12.2833 17 12.521 16.904 12.713 16.712C12.9043 16.5207 13 16.2833 13 16H14C14.2833 16 14.521 15.904 14.713 15.712C14.9043 15.5207 15 15.2833 15 15V12C15 11.7167 14.9043 11.479 14.713 11.287C14.521 11.0957 14.2833 11 14 11H11V10H14C14.2833 10 14.521 9.904 14.713 9.712C14.9043 9.52067 15 9.28333 15 9C15 8.71667 14.9043 8.479 14.713 8.287C14.521 8.09567 14.2833 8 14 8H13C13 7.71667 12.9043 7.479 12.713 7.287C12.521 7.09567 12.2833 7 12 7C11.7167 7 11.4793 7.09567 11.288 7.287C11.096 7.479 11 7.71667 11 8H10C9.71667 8 9.47933 8.09567 9.288 8.287C9.096 8.479 9 8.71667 9 9V12C9 12.2833 9.096 12.5207 9.288 12.712C9.47933 12.904 9.71667 13 10 13H13V14H10C9.71667 14 9.47933 14.0957 9.288 14.287C9.096 14.479 9 14.7167 9 15C9 15.2833 9.096 15.5207 9.288 15.712C9.47933 15.904 9.71667 16 10 16ZM4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.196 19.021 2 18.55 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.97933 4.196 3.45 4 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.8043 4.97933 22 5.45 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.021 19.8043 20.55 20 20 20H4ZM4 18H20V6H4V18Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="pt-2">
        <span
          className={`inline-block px-2 text-sm ${
            percentage <= 50 ? "bg-red-300" : "bg-green-300"
          } text-gray-900 font-bold rounded`}
        >
          {percentage}%
        </span>
      </div>
    </div>
    </Link>

  );
};

export default Stats;
