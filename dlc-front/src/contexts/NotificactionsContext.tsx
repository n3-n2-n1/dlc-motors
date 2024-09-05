import React, { createContext, useContext, useState, useEffect } from 'react';
import { addNotification as saveNotificationToDB, getNotifications, deleteNotifications } from '../utils/indexedDButils'; // Funciones de IndexedDB

// Tipo de notificación
type Notification = {
  id?: number;  // ID opcional (porque al principio puede no existir)
  message: string;
  isRead: boolean;
};

// Contexto de notificaciones
const NotificationContext = createContext<any>(null);

// Proveedor del contexto
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Cargar notificaciones desde IndexedDB cuando se monta el componente
  useEffect(() => {
    const loadNotifications = async () => {
      const storedNotifications = await getNotifications();
      setNotifications(storedNotifications);
      setUnreadCount(storedNotifications.filter((notif: Notification) => !notif.isRead).length);
    };
    loadNotifications();
  }, []);

  // Función para agregar una nueva notificación
  const addNotification = async (message: string) => {
    const newNotification: Notification = {
      message,
      isRead: false,
    };

    // Guardar en IndexedDB y obtener el ID generado
    const id = await saveNotificationToDB(newNotification);

    // Añadir la notificación con el ID generado al estado
    setNotifications((prev) => [{ ...newNotification, id }, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  // Función para marcar una notificación como leída
  const markAsRead = async (id: number) => {
    // Actualizar solo el estado (puedes también actualizar el estado en IndexedDB si lo necesitas)
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
    setUnreadCount((prev) => prev - 1);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para usar el contexto
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
