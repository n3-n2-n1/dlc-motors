import React from "react";
import { useNotification } from "../../contexts/NotificactionsContext";
import { useRef, useEffect, useState } from "react";
import NotificationsIcon from "../icon/NotificationsIcon/NotificationsIcon";
import { paths } from "../../routes/paths";
import { Link } from "react-router-dom";
const NotificationIcon = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { notif } = useNotification(); // Change here

  console.log(notif);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        <NotificationsIcon />
      </button>
      {isDropdownVisible && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg z-20">
          {notif.length > 0 ? (
            notif.slice(-5).map((notification, index) => (
              <div key={index} className="p-2 border-b border-gray-200">
                <Link
                  to={paths.notifications}
                  key={index}
                  className="block p-2 border-b border-gray-200 hover:bg-gray-100"
                >
                  <div className="font-semibold text-sm text-gray-800">
                    {notification.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {notification.rubro}
                  </div>
                  <div className="text-sm text-gray-700">
                    {notification.message}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">
              No hay notificaciones
            </div>
          )}
          <Link to={paths.notifications} className="block p-2 border-b border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-400">
            <div className="p-3 bg-gray ">Ver más</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
