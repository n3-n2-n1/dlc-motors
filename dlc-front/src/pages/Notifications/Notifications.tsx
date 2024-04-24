import React, { useEffect, useState } from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import Navbar from '../../components/Navbar/Navbar';
import NotificationTableChart from '../../components/Tables/NotificationTableChart';
import Loader from '../../components/Loader/Loader';
import PageTitle from '../../components/PageTitle/PageTitle';
import { NOTIFCOLUMNS } from '../../components/columns/Columns';



type Notification = {
  name: string;         // Descripción del producto
  message: string;      // Mensaje de la notificación (por ejemplo, 'Stock bajo')
  origen: string;       // Origen del producto
  rubro: string;        // Rubro o categoría del producto
  oem: string;          // Código OEM del producto
  marca: string;        // Marca o marcas compatibles
  stock: number;        // Cantidad actual de stock
  image: string;        // URL de la imagen del producto
  codInterno: string;   // Código interno del producto
};


const Notifications = () => {
  const { products } = useSearchContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const LOW_STOCK_THRESHOLD_PERCENT = 20; // Define el umbral como 20% del stock inicial

  const generateNotifications = (products: any[]): Notification[] => {
    return products.map(product => {
      let message = '';
  
      // Convertir 'stock' a número. Si es vacío o inválido, considerar como 0.
      const stock = product.stock ? parseInt(product.stock, 10) : 0;
      const threshold = 10; // Ajusta este valor según tus necesidades
  
      if (stock === 0) {
        message = 'No hay stock';
      } else if (stock <= threshold) {
        message = 'Stock bajo';
      }
  
      if (message) {
        return {
          name: product.descripcion,
          message,
          origen: product.origen,
          rubro: product.rubro,
          oem: product.codOEM,
          marca: product.marcasCompatibles,
          stock: stock,
          image: product.imagen,
          codInterno: product.codigoInt
        };
      }
  
      return null;
    }).filter(Boolean);
  };
  
  useEffect(() => {
    setIsLoading(true);
    const newNotifications = generateNotifications(products);
    setNotifications(newNotifications); // Establece las nuevas notificaciones
    setIsLoading(false);
  }, [products]); // Dependencia 'products'

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="DLC Motors • Notificaciones" />
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-white h-screen text-sm p-6 transition-colors duration-300 select-none">
        <Navbar
          title="Notificaciones"
          subtitle="Visualizá faltantes, egresos y stocks"
        />
        <div className="mt-4 overflow-x-auto overflow-y-auto transition-colors duration-300">
          <NotificationTableChart columns={NOTIFCOLUMNS} data={notifications} />
        </div>
      </div>
    </>
  );
};

export default Notifications;