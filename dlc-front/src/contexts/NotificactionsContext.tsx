import React, { useEffect, createContext, useContext, useState, useRef } from 'react';
import { Notification } from '../pages/Notifications/Notifications';
import { useSearchContext } from './SearchContext';

interface NotificactionProps {
    notifications: Notification[]
}

export const NotificationsContext = createContext<NotificactionProps | undefined>(undefined);

export const NotificationsProvider: React.FC = ({ children }: { children?: React.ReactNode }) => {
    const [loadIndex, setLoadIndex] = useState(0);
    const [notif, setNotif] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const { products } = useSearchContext();
    const [previousStock, setPreviousStock] = useState<Map<string, number>>(
        new Map()
    );
    const loader = useRef(null);
    const displayValue = (value: string | undefined) => value || "-";

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

        setNotif((prevNotifications) => [
            ...prevNotifications,
            ...newNotifications,
        ]);
    }, [products, loadIndex, previousStock]);

    const value = {
        notif,
        loading

    };

    return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
};

export const useNotification = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotif debe ser utilizado dentro de un NotificationsProvider')
    }
    return context;
}