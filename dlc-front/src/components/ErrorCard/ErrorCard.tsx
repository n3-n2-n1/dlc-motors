import React, { useState, useEffect } from "react";
import { fetchErrors } from "../../utils/Handlers/Handlers";


interface Errors {
  CodigoError: string;
  Observacion: string;
  Detalle: string;
  Cantidad: number;
  Precio: number;
  Producto: string;
  Codigo: string;
  CodBarras: number;
  Origen: string;
  Imagen: string;
  Fecha: string;
}

function ErrorCard() {
  const [errorData, setErrorData] = useState<Errors[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchErrors();
        setErrorData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="bg-gray-900 w-full flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-[57vh] overflow-y-auto lg:block hidden">
    {errorData.map((error, index) => (
      <div key={error.CodBarras} className="flex-shrink-1 mb-4 px-4">
        <div className="rounded-lg overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl ">
          <div className="bg-yellow-500 p-4">
            
            <span className="inline-flex items-center justify-center px-3 bg-white rounded-md shadow-lg">
            <h3 className="text-slate-900 dark:text-white text-lg font-medium tracking-tight">{error.Producto}</h3>
              
              <svg className="h-6 w-3 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-slate-900 dark:text-white text-lg font-medium tracking-tight">{error.Fecha}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{error.Observacion}</p>
            <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">Error: {error.CodigoError}</h3>
            <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">Origen: {error.Origen}</h3>
            <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">CodBarras: {error.CodBarras}</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">{error.Detalle}</p>
            <img className="text-slate-500 dark:text-slate-400 mt-2 text-sm h-[128px] w-[129px]" src="https://i.postimg.cc/JhHV1g74/coveremail2.png"></img>
          </div>
        </div>
      </div>
    ))}
  </div>

  );
}

export default ErrorCard;
