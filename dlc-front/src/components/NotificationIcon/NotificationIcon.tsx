import React from "react";
import { useNotification } from "../../contexts/NotificactionsContext";
import { useRef, useEffect, useState } from "react";

const NotificationIcon = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const { notifications } = useNotification();

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
        {/* Aquí puedes añadir un icono de notificación */}
        Notificaciones
      </button>
      {isDropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          {/* Lista de notificaciones */}
          {notifications.map((notification, index) => (
            <div key={index} className="p-2 border-b border-gray-200">
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
