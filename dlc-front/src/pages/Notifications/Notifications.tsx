import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext";
import { useUser } from "../../contexts/UserContext";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";
import Navbar from "../../components/Navbar/Navbar";
import Charted from "../../components/MockTable/MockTable";
import { NOTIFCOLUMNS } from "../../components/columns/Columns";
import { NotifFetchNodes } from "../../nodes/productNodes";
import NotificationTableChart from "../../components/Tables/NotificationTableChart";
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
  
const {
  outcomesObservations
} = useBrandsObservations();

  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>([]);
  const { products } = useSearchContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadIndex, setLoadIndex] = useState(0);
  const [previousStock, setPreviousStock] = useState<Map<string, number>>(
    new Map()
  );
  const loader = useRef(null);
  const displayValue = (value: string | undefined) => value || "-";

  const { users } = useUser();
  const userNames = users?.map((user) => user.name);
  console.log(userNames)

  const notifNodes = NotifFetchNodes();
  
  useEffect(() => {
    const newNotifications = products
      .slice(loadIndex, loadIndex + 100)
      .map((product) => {
        const prevStock = previousStock.get(product.descripcion) || product.stock;
        let message = "";

        if (product.Stock === 0) {
          message = `No hay stock`;
        } else if (product.stock <= 10) {
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
  }, [products, loadIndex, previousStock]);

  
  console.log('Notif', notifications)
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-white h-screen overflow-hidden text-sm p-6">
      <Navbar title="Notificaciones" subtitle="Visualizá faltantes, egresos y stocks" />   
      <div className="mt-4 overflow-x-auto shadow-lg">
        <NotificationTableChart columns={NOTIFCOLUMNS} data={notifications} />
      </div>
    </div>
  );
};

export default Notifications;
