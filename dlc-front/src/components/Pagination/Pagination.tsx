import { useState, useEffect } from "react";
import { useSearchContext } from "../../contexts/SearchContext.tsx";

const Pagination: React.FC = ({}) => {
  const { totalPages, currentPage, setCurrentPage } = useSearchContext();
  const [leftPage, setLeftPage] = useState(1);
  const [rightPage, setRightPage] = useState(Math.min(10, totalPages));

  useEffect(() => {
    setLeftPage(1);
    setRightPage(Math.min(10, totalPages));
  }, [totalPages]);

  const handleLeftClick = () => {
    setLeftPage((prevLeftPage) => Math.max(1, prevLeftPage - 10));
    setRightPage((prevRightPage) => Math.max(10, prevRightPage - 10));
  };

  const handleRightClick = () => {
    setLeftPage((prevLeftPage) => Math.min(totalPages - 9, prevLeftPage + 10));
    setRightPage((prevRightPage) => Math.min(totalPages, prevRightPage + 10));
  };

  return (
    <div className="flex w-full items-center mb-7">
      <div className="flex w-full mt-5 space-x-2 justify-end">
      {totalPages > 10 && (
        <button onClick={handleLeftClick}>
          <svg
            className="w-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        )}
        {[...Array(rightPage - leftPage + 1)].map((_, index) => {
          const pageNumber = leftPage + index;
          return (
            <button
              key={pageNumber}
              className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none ${
                currentPage === pageNumber ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        {totalPages > 10 && (
          <button onClick={handleRightClick}>
            <svg
              className="w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
