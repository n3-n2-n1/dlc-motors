import React, { useState, useEffect } from "react";
import { fetchErrors } from "../../utils/Handlers/Handlers";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <div>
      {errorData.length > 0 && (
        <Slider {...settings}>
          {errorData.map((error, index) => (
            <div key={error.CodBarras} className="">
              <div className="rounded-lg bg-white w-[220px] dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl">
                <div className="p-6">
                  <h3 className="text-slate-900 dark:text-white text-lg font-medium tracking-tight">{error.Fecha}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{error.Observacion}</p>
                  <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">Error: {error.CodigoError}</h3>
                  <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">Origen: {error.Origen}</h3>
                  <h3 className="text-slate-900 dark:text-white mt-1 text-m font-medium tracking-tight">CodBarras: {error.CodBarras}</h3>
                  {/* <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">{error.Detalle}</p>
                  <img className="text-slate-500 dark:text-slate-400 mt-2 text-sm h-[128px] w-[129px]" src="https://i.postimg.cc/JhHV1g74/coveremail2.png" alt="Error"></img> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default ErrorCard;
