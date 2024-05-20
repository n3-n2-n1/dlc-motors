// hooks/useFetchNodes.js
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import {
  fetchMoves,
  fetchErrors,
  fetchReturns,
  fetchDelivery,
  fetchCosts,
} from "../utils/Handlers/Handlers";
import { useNotification } from "../contexts/NotificactionsContext";

export const useFetchNodes = () => {
  const { products } = useSearchContext();
  const [productNodes, setProductNodes] = useState([]);



  useEffect(() => {
    // Asegúrate de que 'products' sea un array antes de intentar mapearlo
    if (Array.isArray(products)) {
      const transformedNodes = products.map((product) => ({
        id: product.codigoInt,
        codigoInt: product.codigoInt,
        SKU: product.SKU,
        descripcion: product.descripcion,
        origen: product.origen,
        marcasCompatibles: product.marcasCompatibles,
        kit: product.kit,
        contadorDevoluciones: product.contadorDevoluciones,
        check: product.check,
        stock: product.stock,
        rubro: product.rubro,
        stockFuturo: product.stockFuturo,
        OEM: product.codOEM,
        img: product.imagen,
      }));
      setProductNodes(transformedNodes);
    }
  }, [products]);
  return productNodes;
};

export const NotifFetchNodes = () => {
  const { notifications } = useNotification();
  const [notiNodes, setNotiNodes] = useState([]);

  useEffect(() => {
    // Asegúrate de que 'notifications' sea un array antes de intentar mapearlo
    if (Array.isArray(notifications)) {
      const notificationNodes = notifications.map((notif) => ({
        name: notif.name,
        codInterno: notif.codInterno,
        imagen: notif.image,
        aviso: notif.message,
        oem: notif.oem,
        marca: notif.marca,
        descripcion: notif.name,
        origen: notif.origen,
        stock: notif.stock,
        rubro: notif.rubro,
      }));
      setNotiNodes(notificationNodes);
    }
  }, [notifications]);


  return notiNodes;
};

export const ReturnsFetchNodes = () => {
  const { products } = useSearchContext();
  const [returnNodes, setReturnNodes] = useState([]);


  useEffect(() => {
    // Asegúrate de que 'products' sea un array antes de intentar mapearlo
    const getReturnData = async () => {
      const result = await fetchReturns();
      try {
        const transformedNodes = result.payload.map((product) => ({
          fecha: product.fecha,
          observaciones: product.observaciones,
          codInterno: product.codInterno,
          codOEM: product.codOEM,
          desc: product.desc,
          stock: product.stock,
          detalle: product.detalle,
          cantidad: product.cantidad,
          kit: product.kit,
          contador: product.contador,
          user: product.user,
          origen: product.origen,
          marcasCompatibles: product.marcasCompatibles
        }));
        setReturnNodes(transformedNodes);
      } catch (error) {
        throw new Error("Error al fetchear o mapeear");
      }
    };
    getReturnData();
  }, []);
  return returnNodes;
};

export const MovesFetchNodes = () => {
  const [moveNodes, setMovesNodes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Suponiendo que fetchMoves es una función que ya procesa la respuesta y devuelve un JSON
        const result = await fetchMoves();

        if (result.status === "success") {
          const transformedNodes = result.payload.map((product) => ({
            // Mapea tus datos como necesites
            user: product.user,
            tipoMov: product.tipoMov,
            fecha: product.fecha,
            observaciones: product.observaciones,
            codigoInt: product.codigoInt,
            kit: product.kit,
            check: product.check,
            stock: product.stock,
            rubro: product.rubro,
            codOEM: product.codOEM,
            cantidad: product.cantidad,
            det: product.det,
            stockAct: product.stockAct,
            stockReal: product.stockReal,
            desc: product.desc,
            marcasCompatibles: product.marcasCompatibles,
            // ...otros campos
          }));
          setMovesNodes(transformedNodes);
        } else {
          // Manejar situaciones donde el estado no es 'success'
          throw new Error("La respuesta del servidor no fue de éxito.");
        }
      } catch (error) {
        console.error("Hubo un error al recuperar los movimientos:", error);
      }
    };
    fetchProducts();
  }, []);
  return moveNodes;
};

export const ErrorFetchNodes = () => {
  const [errorNodes, setErrorNodes] = useState([]);

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        // Suponiendo que fetchMoves es una función que ya procesa la respuesta y devuelve un JSON
        const result = await fetchErrors();

        if (result.status === "success") {
          const transformedNodes = result.payload.map((error) => ({
            // Mapea tus datos como necesites
            id: error.id,
            fecha: error.fecha,
            observaciones: error.observaciones,
            codInterno: error.codInterno,
            codOEM: error.codOEM,
            kit: error.kit,
            desc: error.desc,
            img: error.img,
            stock: error.stock,
            user: error.user,
            estado: error.estado,
            det: error.det,
            origen: error.origen,
            rubro: error.rubro,
            marcasCompatibles: error.marcasCompatibles,
            // ...otros campos
          }));
          setErrorNodes(transformedNodes);
        } else {
          // Manejar situaciones donde el estado no es 'success'
          throw new Error("La respuesta del servidor no fue de éxito.");
        }
      } catch (error) {
        console.error("Hubo un error al recuperar los movimientos:", error);
      }
    };
    fetchErrorData();
  }, []);
  return errorNodes;
};

export const DeliveryFetchNodes = () => {
  const [deliveryNodes, setDeliveryNodes] = useState([]);
  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        // Suponiendo que fetchMoves es una función que ya procesa la respuesta y devuelve un JSON
        const result = await fetchDelivery();

        if (result.status === "success") {
          const transformedNodes = result.payload.map((delivery) => ({
            // Mapea tus datos como necesites
            id: delivery.id,
            fecha: delivery.fecha,
            observaciones: delivery.observaciones,
            codigoInt: delivery.codigoInt,
            codOEM: delivery.codOEM,
            kit: delivery.kit,
            desc: delivery.desc,
            img: delivery.img,
            stock: delivery.stock,
            user: delivery.user,
            estado: delivery.estado,
            det: delivery.det,
            numImpo: delivery.numImpo,
            cantidad: delivery.cantidad,
            stockDeposito: delivery.stockDeposito,
            stockAcumulado: delivery.stockAcumulado,
            productos: delivery.productos
            // ...otros campos
          }));
          setDeliveryNodes(transformedNodes);
        } else {
          // Manejar situaciones donde el estado no es 'success'
          throw new Error("La respuesta del servidor no fue de éxito.");
        }
      } catch (error) {
        console.error("Hubo un error al recuperar los movimientos:", error);
      }
    };
    fetchDeliveryData();
  }, []);

  return deliveryNodes;
};

export const ImportedCost = () => {
  const [importedNodes, setImportedNodes] = useState([]);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        // Suponiendo que fetchMoves es una función que ya procesa la respuesta y devuelve un JSON
        const result = await fetchCosts();

        if (result.status === "success") {
          const transformedNodes = result.payload.map((delivery) => ({
            // Mapea tus datos como necesites

            codigo: delivery.codigo,
            descripcion: delivery.desc,
            marca: delivery.marca,
            proveedores: delivery.stockAcumulado,
            stock: delivery.stock,
            rubro: delivery.rubro,
            sku:delivery.sku
            // skuotros campos
          }));
          setImportedNodes(transformedNodes);
        } else {
          // Manejar situaciones donde el estado no es 'success'
          throw new Error("La respuesta del servidor no fue de éxito.");
        }
      } catch (error) {
        console.error("Hubo un error al recuperar los movimientos:", error);
      }
    };
    fetchDeliveryData();
  }, []);

  return importedNodes;
};

export const FabricCost = () => {
  const [fabricNodes, setFabricNodes] = useState([]);

  useEffect(() => {
    const fetchFabricData = async () => {
      try {
        // Suponiendo que fetchMoves es una función que ya procesa la respuesta y devuelve un JSON
        const result = await fetchCosts();

        if (result.status === "success") {
          const transformedNodes = result.payload.map((fabric) => ({
            // Mapea tus datos como necesites
            observaciones: fabric.observaciones,
            codigo: fabric.codigo,
            descripcion: fabric.descripcion,
            marca: fabric.marca,
            proveedores: fabric.proveedores,
            sku: fabric.sku,
            rubro: fabric.rubro
            // ...otros campos
          }));
          setFabricNodes(transformedNodes);
        } else {
          // Manejar situaciones donde el estado no es 'success'
          throw new Error("La respuesta del servidor no fue de éxito.");
        }
      } catch (error) {
        console.error("Hubo un error al recuperar los movimientos:", error);
      }
    };
    fetchFabricData();
  }, []);

  return fabricNodes;
};

export const ResaleCost = () => {
  const [resaleNodes, setResaleNodes] = useState([]);

  useEffect(() => {
    const fetchResaleData = async () => {
      try {
        // Suponiendo que fetchMoves es una función que ya procesa la respuesta y devuelve un JSON
        const result = await fetchCosts();

        if (result.status === "success") {
          const transformedNodes = result.payload.map((resale) => ({
            // Mapea tus datos como necesites
            observaciones: resale.observaciones,
            codigo: resale.codigo,
            descripcion: resale.descripcion,
            marca: resale.marca,
            proveedores: resale.proveedores,
            sku: resale.sku,
            rubro: resale.rubro
            // ...otros campos
          }));
          setResaleNodes(transformedNodes);
        } else {
          // Manejar situaciones donde el estado no es 'success'
          throw new Error("La respuesta del servidor no fue de éxito.");
        }
      } catch (error) {
        console.error("Hubo un error al recuperar los movimientos:", error);
      }
    };
    fetchResaleData();
  }, []);
  return resaleNodes;
};
