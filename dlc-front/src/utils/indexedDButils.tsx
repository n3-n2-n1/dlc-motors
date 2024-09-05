import { openDB } from 'idb';

// Inicializar la base de datos IndexedDB
const initDB = async () => {
  return await openDB('notificationsDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('notifications')) {
        db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Obtener todas las notificaciones
export const getNotifications = async () => {
  const db = await initDB();
  return await db.getAll('notifications');
};

// Añadir una notificación
export const addNotification = async (notification: { message: string; isRead: boolean }) => {
  const db = await initDB();
  await db.add('notifications', notification);
};

// Marcar notificación como leída
export const markAsRead = async (id: number) => {
  const db = await initDB();
  const notification = await db.get('notifications', id);
  if (notification) {
    notification.isRead = true;
    await db.put('notifications', notification);
  }
};

export const deleteNotifications = async (id: number) => {
    const db = await initDB();
    await db.delete('notifications', id);
  };

// Contar notificaciones no leídas
export const countUnreadNotifications = async () => {
  const db = await initDB();
  const allNotifications = await db.getAll('notifications');
  return allNotifications.filter((notif) => !notif.isRead).length;
};
