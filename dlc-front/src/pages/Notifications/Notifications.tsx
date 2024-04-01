import React, { useEffect, useState } from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import Navbar from '../../components/Navbar/Navbar';
import NotificationTableChart from '../../components/Tables/NotificationTableChart';
import Loader from '../../components/Loader/Loader';
import PageTitle from '../../components/PageTitle/PageTitle';
import { NOTIFCOLUMNS } from '../../components/columns/Columns';

const Notifications = () => {
  const { products } = useSearchContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateNotifications = (products: any[]): Notification[] => {
  // Suponiendo que 'products' es un array de objetos con información del producto
  return products.map(product => {
    let message = '';

    if (product.stock === 0) {
      message = 'No hay stock';
    } else if (product.stock <= 10) {
      message = 'Stock bajo';
    } else if (product.stock < 5) {
      message = 'Reposición';
    }

    return message ? {
      name: product.descripcion,
      message,
      origen: product.origen,
      rubro: product.rubro,
      oem: product.codOEM,
      marca: product.marcasCompatibles,
      stock: product.stock,
      image: product.imagen,
      codInterno: product.codigoInt
    } : null;
  }).filter(Boolean); // Filtra los elementos nulos
};

// Nota: Asegúrate de exportar el tipo 'Notification' si está definido en otro archivo.


  useEffect(() => {
    setIsLoading(true);
    const newNotifications = generateNotifications(products);
    setNotifications(prev => [...prev, ...newNotifications]);
    console.log(newNotifications + 'acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    setIsLoading(false);
  }, [products]);

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
        <div className="mt-4 overflow-x-auto overflow-y-auto shadow-lg transition-colors duration-300">
          <NotificationTableChart columns={NOTIFCOLUMNS} data={notifications} />
        </div>
      </div>
    </>
  );
};

export default Notifications;
