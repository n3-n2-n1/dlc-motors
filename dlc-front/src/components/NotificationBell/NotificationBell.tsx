import React, { useState } from 'react';
import { useNotificationContext } from '../../contexts/NotificactionsContext';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead } = useNotificationContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMarkAsRead = (id: number) => {
    markAsRead(id);
  };

  return (
    <div className="relative">
      {/* Icono de campanita */}
      <button onClick={toggleDropdown} className="relative">
        <span className="material-icons">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500">No hay notificaciones</div>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="p-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span>{notification.message}</span>
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id!)} // El signo de exclamación indica que el ID no es nulo aquí
                        className="text-blue-500"
                      >
                        Marcar como leído
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
