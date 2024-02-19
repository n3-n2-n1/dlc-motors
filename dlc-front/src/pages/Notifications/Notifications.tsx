import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { OutcomeObservations } from "../../routes/routes";
import { useUser } from "../../contexts/UserContext";
import { FilterConfig } from "../../components/SearchFloat/SearchFloat";
import Navbar from "../../components/Navbar/Navbar";
interface Notification {
  name: string;
  message: string;
  image?: string;
  codInterno?: string;
  marca?: string;
  rubro?: string;
  oem?: string;
  origen?: string;
  stock?: number;
}



const Notifications = () => {
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


  const NotificationsFilterConfig: FilterConfig[] = [
    {
      key: "observacion",
      label: "Observación",
      type: "dropdown",
      options: OutcomeObservations,
    },
    {
      key: "detalle",
      label: "Detalle",
      type: "text",
    },
    {
      key: "user",
      label: "Usuario",
      type: "dropdown",
      options: userNames,
    },
    {
      key: "codigoInt",
      label: "Buscar por código interno",
      type: "text",
    },
    {
      key: "globalSearch",
      label: "Ingrese texto para buscar",
      type: "text",
    },
  ];

  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoadIndex((prevIndex) => prevIndex + 100);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [handleObserver]);

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

  return (
    <div className="flex flex-col bg-gray-900 text-white h-screen overflow-hidden text-sm p-6">

      <Navbar title="Notificaciones" subtitle="Visualizá faltantes, egresos y stocks" />
        <FiltroFloat filtersConfig={NotificationsFilterConfig} /> 
      <div className="mt-4 overflow-x-auto shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Producto
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Aviso
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Codigo
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Descripcion
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                OEM
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Marca
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Rubro
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Origen
              </th>
              <th className="px-4 py-2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {notifications.map((notification, index) => (
              
              <tr key={index} className="align-top">
                <td className="px-4 py-2 max-w-xs truncate">
                  {displayValue(notification.name)}
                </td>
                <td className="px-4 py-2 max-w-xs">Fecha</td>
                <td className="px-4 py-2">
                  {displayValue(notification.message)}
                </td>
                <td className="px-4 py-2">
                  {displayValue(notification.image)}
                </td>
                <td className="px-4 py-2">
                  {displayValue(notification.codInterno)}
                </td>
                <td className="px-4 py-2">{displayValue(notification.name)}</td>
                <td className="px-4 py-2">{displayValue(notification.oem)}</td>
                <td className="px-4 py-2">
                  {displayValue(notification.rubro)}
                </td>
                <td className="px-4 py-2">
                  {displayValue(notification.marca)}
                </td>
                <td className="px-4 py-2">
                  {displayValue(notification.origen)}
                </td>
                <td className="px-4 py-2">
                  {displayValue(notification.stock)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={loader} />
      </div>
    </div>
  );
};

export default Notifications;
