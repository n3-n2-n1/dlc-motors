import React, { useState, useEffect } from "react";
import { fetchErrors } from "../../utils/Handlers/Handlers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 5,
  };

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
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {errorData.map((error, index) => (
        <div key={error.CodBarras} className="rounded-lg bg-white dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl">
          <div className="p-6">
            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-medium tracking-tight">
                {error.Fecha}
              </h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {error.Observacion}
            </p>
            <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">
              Error: {error.CodigoError}
            </h3>
            <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">
              Origen: {error.Origen}
            </h3>
            <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">
              CodBarras: {error.CodBarras}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default ErrorCard;
