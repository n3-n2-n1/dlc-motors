import { useState, useEffect } from "react";
import { useSearchContext } from "../../contexts/SearchContext.tsx";
import ArrowIcon from "../icon/ArrowIcon/ArrowIcon.tsx";

const Pagination: React.FC = () => {
  const { totalPages, currentPage, setCurrentPage } = useSearchContext();
  const [leftPage, setLeftPage] = useState(1);
  const [rightPage, setRightPage] = useState(Math.min(10, Math.max(totalPages, 1)));

  useEffect(() => {
    setLeftPage(1);
    setRightPage(Math.min(10, Math.max(totalPages, 1)));
  }, [totalPages]);

  const handleLeftClick = () => {
    const newLeftPage = Math.max(1, leftPage - 10);
    setLeftPage(newLeftPage);
    setRightPage(Math.min(newLeftPage + 9, totalPages));
  };

  const handleRightClick = () => {
    const newRightPage = Math.min(totalPages, rightPage + 10);
    setRightPage(newRightPage);
    setLeftPage(Math.max(1, newRightPage - 9));
  };

  // Calculamos la longitud del arreglo de forma segura
  const pagesLength = Math.max(0, Math.min(rightPage, totalPages) - leftPage + 1);


  return (
    <div className="flex w-full items-center mb-7">
      <div className="flex w-full mt-5 space-x-2 justify-start">
        {totalPages > 10 && (
          <button onClick={handleLeftClick}>
            <ArrowIcon className="rotate-180" color="white" />
          </button>
        )}
        {Array.from({ length: pagesLength }, (_, index) => leftPage + index).map(pageNumber => (
          <button
            key={pageNumber}
            className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none ${
              currentPage === pageNumber ? "text-[#A9DFD8]" : "text-gray-500"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {totalPages > 10 && (
          <button onClick={handleRightClick}>
            <ArrowIcon color="white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
