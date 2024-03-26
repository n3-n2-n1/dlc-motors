import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext";
import { useUser } from "../../contexts/UserContext";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";
import Navbar from "../../components/Navbar/Navbar";
import { NotifFetchNodes } from "../../nodes/productNodes";
import { NOTIFCOLUMNS } from "../../components/columns/Columns";
import NotificationTableChart from "../../components/Tables/NotificationTableChart";
import Loader from "../../components/Loader/Loader";
import PageTitle from "../../components/PageTitle/PageTitle";


export interface Notification {
  name: string;
  message: string;
  image?: string;
  codInterno?: string;
  marca?: string;
  rubro?: string;
  oem?: string;
  origen?: string;
  stock?: string;
}

const Notifications = () => {
  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>([]);
  const { products } = useSearchContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadIndex, setLoadIndex] = useState(0);
  const [previousStock, setPreviousStock] = useState<Map<string, number>>(
    new Map()
  );

  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el control de carga

  useEffect(() => {
    setIsLoading(true);
    const newNotifications = products
      .slice(loadIndex, loadIndex + 100)
      .map((product) => {
        const prevStock =
          previousStock.get(product.descripcion) || product.stock;
        let message = "";

        if (product.Stock === 0) {
          message = `No hay stock`;
        } else if (product.stock <= 1) {
          message = `Stock bajo`;
        } else if (product.stock > prevStock) {
          message = `Reposición`;
        }

        previousStock.set(product.descripcion, product.stock);
        return message
          ? {
              name: product.descripcion,
              message,
              origen: product.origen,
              rubro: product.rubro,
              oem: product.codOEM,
              marca: product.marcasCompatibles,
              stock: product.stock,
              image: product.imagen,
              codInterno: product.codigoInt,
            }
          : null;
      })
      .filter(Boolean);

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...newNotifications,
    ]);
    setIsLoading(false);
  }, [products, loadIndex, previousStock]);

  if (isLoading) {
    return Loader; // Muestra esto mientras isLoading sea true
  }

  console.log("Notif", notifications);

  return (
    <>
    <PageTitle title="DLC Motors • Notificaciones" />

    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-white h-screen text-sm p-6 transition-colors duration-300 select-none">
      <Navbar
        title="Notificaciones"
        subtitle="Visualizá faltantes, egresos y stocks"
        />
      <div className="mt-4 overflow-x-auto overflow-y-auto shadow-lg transition-colors duration-300">
        <NotificationTableChart columns={NOTIFCOLUMNS} data={notifications} />
      </div>
    </div>
        </>
  );
};

export default Notifications;
