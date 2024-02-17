import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import FiltroFloat from "../../components/SearchFloat/SearchFloat";
import { OutcomeObservations } from "../../routes/routes";
import { useUser } from "../../contexts/UserContext";

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
        const prevStock = previousStock.get(product.Producto) || product.Stock;
        let message = "";

        if (product.Stock === 0) {
          message = `No hay stock`;
        } else if (product.Stock <= 10) {
          message = `Stock bajo`;
        } else if (product.Stock > prevStock) {
          message = `Reposición`;
        }

        previousStock.set(product.Producto, product.Stock);
        return message
          ? {
              name: product.Producto,
              message,
              origen: product.Origen,
              rubro: product.Rubro,
              oem: product.CodOEM,
              marca: product.Marca,
              stock: product.Stock,
              image: product.Image,
              codInterno: product.Codigo,
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

      <div className="flex flex-col">
        <h1 className="text-3xl mb-2 font-semibold">Notificaciones</h1>
        <h2 className="text-lg mb-4">
          Alertas de stock, errores y movimientos.
        </h2>
        <FiltroFloat filtersConfig={NotificationsFilterConfig} /> 
      </div>
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
