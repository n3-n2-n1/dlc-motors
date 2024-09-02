import { Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext.tsx";
import { updateDelivery, updateError } from "../../utils/Handlers/Handlers.tsx";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useRoleCheck from "../../hooks/useRoleCheck";

const resize = { resizerHighlight: "#dee2e6", minWidth: 100, innerWidth: 200 };
const hiddenColumns = [""];

const getColorClass = (estado: string) => {
  switch (estado) {
    case "Cancelado":
      return "bg-red-400";
    case "Entregado":
      return "bg-green-600";
    case "En camino":
      return "bg-yellow-400";
    default:
      return "bg-white";
  }
};

const getColorClassError = (estado: string) => {
  switch (estado) {
    case "a corregir":
      return "bg-red-400";
    case "corregido":
      return "bg-green-600";
    case "revision":
      return "bg-yellow-400";
    default:
      return "bg-white";
  }
};

const ActionCell = ({ codigoInt }: any) => {
  const { handleDeleteModal } = useBrandsObservations();

  const { user } = useAuth();

  const isDepositOperator = useRoleCheck(user?.role, ["Operador de depósito"]);
  const isFactoryOperator = useRoleCheck(user?.role, ["Operador de fábrica"]);
  const isSupervisor = useRoleCheck(user?.role, ["Supervisor"]);
  const isClient = useRoleCheck(user?.role, ["Cliente"]);

  return (
    <>
      {!isClient &&
      !isDepositOperator &&
      !isFactoryOperator &&
      !isSupervisor ? (
        <div className="flex flex-row gap-2 w-full">
          <Link to={`/productos/editar/${codigoInt}`}>
            <button className={`w-7 p-1 hover:bg-gray-200 rounded-3xl`}>
              🖋️
            </button>
          </Link>
          <button
            className={`w-7 p-1 hover:bg-gray-200 rounded-3xl`}
            onClick={() => handleDeleteModal(codigoInt)}
          >
            ❌
          </button>
        </div>
      ) : (
        <p className="text-center">-</p>
      )}
    </>
  );
};

const DeliveryEdit = ({ item }) => {
  const { user } = useAuth();
  const isAdmin = useRoleCheck(user?.role, ["Administrador"]);
  const [isCancelled, setIsCancelled] = useState(item.estado === "Cancelado");

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    if (newStatus === "Cancelado") {
      setIsCancelled(true);
    }

    const deliveryUpdates = {
      ...item,
      estado: newStatus,
      stockFuturo: item.stockFuturo !== undefined ? item.stockFuturo : 0 // Asegúrate de enviar stockFuturo
    };

    try {
      await updateDelivery(deliveryUpdates);
    } catch (error) {
      console.error("Error updating delivery:", error);
    }
  };

  return (
    <>
      {isAdmin ? (
        <select
          className={`w-full rounded-[5px] text-[1rem] p-0.5 m-0 text-black dark:text-white font-semibold ${getColorClass(
            item.estado
          )}`}
          value={item.estado}
          onChange={handleStatusChange}
          disabled={isCancelled}
        >
          <option value="En camino">En camino</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      ) : (
        <p className="text-center text-white">{item.estado}</p>
      )}
    </>
  );
};



const ErrorEdit = ({ item }: any) => {
  const { user } = useAuth();
  const isSupervisor = useRoleCheck(user?.role, ["Supervisor"]);

  return (
    <>
      {!isSupervisor ? (
        <select
          className={`w-full rounded-[5px] text-[1rem] p-0.5 m-0 text-black font-semibold ${getColorClassError(
            item.estado
          )}`}
          value={item.estado}
          onChange={(event) => {
            const errorUpdates = {
              id: item.id,
              estado: event.target.value,
            };
            updateError(errorUpdates);
          }}
        >
          <option className="text-center dark:text-white text-black" value="a corregir">A corregir</option>
          <option className="text-center dark:text-white text-black" value="corregido">Corregido</option>
          <option className="text-center dark:text-white text-black"value="revision">En revisión</option>
        </select>
      ) : (
        <p className="text-center dark:text-white text-black">{item.estado}</p>
      )}
    </>
  );
};

const RenderStockColumn = ({ item }: any) => {
  const { user } = useAuth();
  const isClient = useRoleCheck(user?.role, ["Cliente"]);

  return isClient
    ? item.stock === 0
      ? "no hay"
      : item.stock > 1 && item.stock < 5
      ? "poco stock"
      : item.stock > 5
      ? "hay stock"
      : null
    : item.stock;
};

export const PRODUCTCOLUMNS = [
  {
    label: "⚙️",
    renderCell: (item: any) => <ActionCell codigoInt={item.codigoInt} />,
    resize,
  },
  {
    label: "Código Interno",
    renderCell: (item: any) => (
      <div style={{ textAlign: "center" }}>
        {item.codigoInt.toLocaleString()}
      </div>
    ),
    resize,
    hide: hiddenColumns.includes("Código Interno"),
    sort: { sortKey: "Código Interno" },

  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU || "-",
    resize,
    hide: hiddenColumns.includes("SKU"),
    sort: { sortKey: "SKU" },
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    hide: hiddenColumns.includes("Rubro"),
    sort: { sortKey: "Rubro" }

  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.descripcion || "-",
    resize,
    hide: hiddenColumns.includes("Descripción"),
    sort: { sortKey: "DESCRIPCION" },
  },
  {
    label: "Origen",
    renderCell: (item: any) => item.origen || "-",
    resize,
    hide: hiddenColumns.includes("Origen"),
    sort: { sortKey: "ORIGEN" },
  },
  {
    label: "Marcas",
    renderCell: (item: any) => {
      return Array.isArray(item.marcasCompatibles)
        ? item.marcasCompatibles.join(" / ")
        : item.marcasCompatibles || "-";
    },
    resize,
    hide: hiddenColumns.includes("Marcas Compatibles"),
    sort: { sortKey: "Marcas" },

  },
  {
    label: "Kit",
    renderCell: (item: any) => {
      if (Array.isArray(item.kit) && item.kit.length > 0) {
        return item.kit.join(', ');
      }
      return '-';
    },
    resize: true,
    hide: hiddenColumns.includes("Kit"),
    sort: { sortKey: "Kit" },
  },  
  {
    label: "Dev",
    renderCell: (item: any) => item.contadorDevoluciones || "-",
    resize,
    sort: { sortKey: "Dev" },
    hide: hiddenColumns.includes("Contador Devoluciones"),
  },
  {
    label: "Stock",
    renderCell: (item: any) => <RenderStockColumn item={item} />,
    resize,
    hide: hiddenColumns.includes("Stock"),
    sort: { sortKey: "Stock" },
  },
  {
    label: "StockFuturo",
    renderCell: (item: any) => item.stockFuturo.length > 0 ? 'Si' : 'No',
    resize,
    sort: { sortKey: "Stockfuturo" },
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.OEM || "-",
    resize,
    sort: { sortKey: "OEM" },
  },
  {
    label: "Imagen",
    renderCell: (item: any) =>
      (
        <div>
          <Tooltip
            withArrow
            transitionProps={{ duration: 200, transition: "fade" }}
            label={
              <img src={item.img} alt="preview" style={{ width: "400px" }} />
            }
          >
            <Link
              to={item.img}
              target="_blank"
              className="font-semibold text-blue-600 hover:text-blue-400"
            >
              Ver
            </Link>
          </Tooltip>
        </div>
      ) || "-",
    resize,
  },
  {
    label: "Check",
    renderCell: (item: any) => {
      if (item.check === "Error") {
        return "X";
      } else if (item.check === "En revisión") {
        return "?";
      } else {
        return "✔️";
      }
    },
    resize,
    hide: hiddenColumns.includes("Check"),
  },
];

export const NOTIFCOLUMNS = [
  {
    label:"Estado",
    renderCell: (item: any) => {
      let bgColorClass = "";
      let bgColorText = "";

      if (item.message === "Stock bajo") {
        bgColorClass = "bg-yellow-300"; // Cambia a amarillo para "Stock bajo"
        bgColorText = "text-black";
      } else if (item.message === "Reposición") {
        bgColorClass = "bg-green-200"; // Cambia a verde para "Reposición"
        bgColorText = "text-black";
      } else if (item.message === "No hay stock") {
        bgColorClass = "bg-red-200"; // Cambia a rojo para "Stock vacío"
        bgColorText = "text-black";
      }

      return (
        <div>
          <div
            className={`pl-3 p-2 break-words text-sm text-gray-700 dark:text-gray-200 ${bgColorClass} rounded-md m-1`}
          >
            <p className={` ${bgColorText} font-bold`}>{item.message}</p>
          </div>
        </div>
      );
    },
    resize,
    sort: { sortKey: "Estado" },

  },
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha || "-",
    resize,
  },
  {
    label: "Imagen",
    renderCell: (item: any) =>
      (
        <a
          href={item.image}
          target="_blank"
          className="font-semibold text-blue-600 hover:text-blue-400"
        >
          {item.image}
        </a>
      ) || "-",
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codigoInt || "-",
    resize,
    sort: { sortKey: "Codigo Interno" },
  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.name || "-",
    resize,
    sort: { sortKey: "Descripción" },
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
    sort: { sortKey: "OEM" },
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca || "-",
    resize,
    sort: { sortKey: "Marca" },
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    sort: { sortKey: "Rubro" },
  },
  {
    label: "Origen",
    renderCell: (item: any) => item.origen || "-",
    resize,
    sort: { sortKey: "Origen" },
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock || "-",
    resize,
    sort: { sortKey: "Stock" },
  },
];

export const DELIVERYCOLUMNS = [
  {
    label: "Fecha",
    renderCell: (item: any) => <div className="p-2">{item.fecha}</div> || "-",
    resize,
  },
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones || "-",
    resize,
  },
  {
    label: "Num. Impo.",
    renderCell: (item: any) => item.numImpo || "-",
    resize,
  },
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad || "-",
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codigoInt || "-",
    resize,
  },
  {
    label: "Descripcion",
    renderCell: (item: any) => item.desc || "-",
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
  },
  {
    label: "Productos",
    renderCell: (item: any) => item.productos || "-",
    resize,
  },
  {
    label: "Stock deposito",
    renderCell: (item: any) => item.stockDeposito || "-",
    resize,
  },
  {
    label: "Stock Acumulado",
    renderCell: (item: any) => item.stockAcumulado || "-",
    resize,
  },
  {
    label: "Estado",
    renderCell: (item: any) => <DeliveryEdit item={item} />,
  },
];

export const ERRORCOLUMNS = [
  {
    label: "Usuario",
    renderCell: (item: any) => <div className="p-2">{item.user}</div> || "-",
    resize,
    sort: { sortKey: "Usuario" }
  },
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha || "-",
    resize,
    sort: { sortKey: "Fecha" }
  },
  {
    label: "Observación",
    renderCell: (item: any) => item.observaciones || "-",
    resize,
    sort: { sortKey: "Observación" }
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.det || "-",
    resize,
    sort: { sortKey: "Detalle" }
  },
  {
    label: "Código Interno",
    renderCell: (item: any) => item.codInterno || "-",
    resize,
    sort: { sortKey: "Código Interno" }
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    sort: { sortKey: "Rubro" }
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
    sort: { sortKey: "OEM" }
  },
  {
    label: "Origen",
    renderCell: (item: any) => item.origen || "-",
    resize,
    sort: { sortKey: "Origen" }
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    sort: { sortKey: "Rubro" }
  },
  {
    label: "Marcas",
    renderCell: (item: any) => item.marcasCompatibles || "-",
    resize,
    sort: { sortKey: "Marcas" }
  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.desc || "-",
    resize,
    sort: { sortKey: "Descripción" }
  },
  {
    label: "Stock Actual",
    renderCell: (item: any) => item.stock || "-",
    resize,
    sort: { sortKey: "Stock Actual" }
  },
  {
    label: "Stock Real",
    renderCell: (item: any) => item.stockReal || "-",
    resize,
    sort: { sortKey: "Stock Real" }
  },
  {
    label: "Imagen",
    renderCell: (item: any) =>
      (
        <div>
          <Tooltip
            withArrow
            transitionProps={{ duration: 200, transition: "fade" }}
            label={
              <img src={item.img} alt="preview" style={{ width: "400px" }} />
            }
          >
            <Link
              to={item.img}
              target="_blank"
              className="font-semibold text-blue-600 hover:text-blue-400"
            >
              Ver Imagen
            </Link>
          </Tooltip>
        </div>
      ) || "-",
    resize,
  },
  {
    label: "Estado",
    renderCell: (item: any) => <ErrorEdit item={item} />,
    sort: { sortKey: "Estado" }

  },
];

export const MOVESCOLUMNS = [
  {
    label: "Usuario",
    renderCell: (item: any) => <div className="ml-2">{item.user}</div> || "-",
    resize,
    sort: { sortKey: "Usuario" }
  },
  {
    label: "Fecha",
    renderCell: (item: any) => <div className="">{item.fecha}</div> || "-",
    resize,
    sort: { sortKey: "Fecha" }
  },
  {
    label: "Movimiento",
    renderCell: (item: any) => item.tipoMov || "-",
    resize,
    sort: { sortKey: "Movimiento" }
  },
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones || "-",
    resize,
    sort: { sortKey: "Observacion" }
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.det || "-",
    resize,
    sort: { sortKey: "Detalle" }
  },
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad || "-",
    resize,
    sort: { sortKey: "Cantidad" }
  },
  {
    label: "Kit",
    renderCell: (item: any) => item.kit || "-",
    resize,
    sort: { sortKey: "Kit" }
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codigoInt,
    resize,
    sort: { sortKey: "Codigo Interno" }
  },
  {
    label: "Descripcion",
    renderCell: (item: any) => item.desc || "-",
    resize,
    sort: { sortKey: "Descripcion" }
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
    sort: { sortKey: "OEM" }
  },
  {
    label: "Marcas",
    renderCell: (item: any) => item.marcasCompatibles || "-",
    resize,
    sort: { sortKey: "Marcas" }
  },
  
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    sort: { sortKey: "Rubro" }
  },
  {
    label: "Stock",
    renderCell: (item: any) => {
      if (item.tipoMov === "Ingreso") {
        return parseInt(item.stock) + parseInt(item.cantidad);
      } else if (item.tipoMov === "Egreso") {
        return parseInt(item.stock) - parseInt(item.cantidad);
      } else {
        return item.stock;
      }
    },
    resize,
    sort: { sortKey: "Stock" }
  },
];

export const HOMECOLUMNS = [
  {
    resize,
    label: "Ultimos Movimientos",
    renderCell: (item: any) => (
      <div className="p-4 text-black">{item.observaciones}</div>
    ),
  },
];

export const RETURNCOLUMNS = [
  {
    label: "Usuario",
    renderCell: (item: any) => <div className="p-2">{item.user}</div> || "-",
    resize,
    sort: { sortKey: "Stock" }
  },
  
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha || "-",
    resize,
    sort: { sortKey: "Fecha" }
  },
  
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones || "-",
    resize,
    sort: { sortKey: "Observacion" }
  },
  
  {
    label: "Detalle",
    renderCell: (item: any) => item.detalle || "-",
    resize,
    sort: { sortKey: "Detalle" }
  },
  
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codIntermp || "-",
    resize,
    sort: { sortKey: "Codigo Interno" }
  },
  
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
    sort: { sortKey: "OEM" }
  },
  {
    label: "Origen",
    renderCell: (item: any) => item.origen || "-",
    resize,
    sort: { sortKey: "Origen" }
  },
  
  {
    label: "Descripcion",
    renderCell: (item: any) => item.desc || "-",
    resize,
    sort: { sortKey: "Descripcion" }
  },

  {
    label: "Marcas",
    renderCell: (item: any) => item.marcasCompatibles || "-",
    resize,
    sort: { sortKey: "Marcas" }
  },
  
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    sort: { sortKey: "Rubro" }
  },
  
  {
    label: "Stock",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    sort: { sortKey: "Stock" }
  },
  
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad || "-",
    resize,
    sort: { sortKey: "Cantidad" }
  },
  
  {
    label: "Kit",
    renderCell: (item: any) => item.kit || "-",
    resize,
    sort: { sortKey: "Kit" }
  },
  
  {
    label: "Contador Dev",
    renderCell: (item: any) => item.contador || "-",
    resize,
    sort: { sortKey: "Contador Dev" }
  },
];

export const IMPORTEDCOLUMNS = [
  {
    label: "Descripcion",
    innerWidth: 120,
    renderCell: (item: any) =>
      <div className="p-2">{item.descripcion}</div> || "-",
    resize,
    sort: { sortKey: "Descripcion" },

    
  },
  {
    label: "Código Interno",
    renderCell: (item: any) => item.codigoInt || "-",
    resize,
    sort: { sortKey: "Código Interno" },
    
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marcasCompatibles || "-",
    resize,
    sort: { sortKey: "Marca" },

  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU || "-",
    resize,
    sort: { sortKey: "SKU" },

  },
  {
    label: "Proveedores",
    renderCell: (item: any) => item.proveedores || "-",
    resize,
    sort: { sortKey: "Proveedores" },
    
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock || "-",
    resize,
    sort: { sortKey: "Stock" },

  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
    sort: { sortKey: "Rubro" },
  },
];

export const RESALECOLUMNS = [
  {
    label: "Descripcion",
    renderCell: (item: any) =>
      <div className="p-2">{item.descripcion}</div> || "-",
    resize,
  },
  {
    label: "Código",
    renderCell: (item: any) => item.codigo || "-",
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca || "-",
    resize,
  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU || "-",
    resize,
  },
  {
    label: "Proveedores",
    renderCell: (item: any) => item.proveedores || "-",
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock || "-",
    resize,
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
];

export const COLUMNSFABRIC = [
  {
    label: "Descripcion",
    renderCell: (item: any) =>
      <div className="p-2">{item.descripcion}</div> || "-",
    resize,
  },
  {
    label: "Código",
    renderCell: (item: any) => item.codigo || "-",
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca || "-",
    resize,
  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU || "-",
    resize,
  },
  {
    label: "Proveedores",
    renderCell: (item: any) => item.proveedores || "-",
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock || "-",
    resize,
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
  {
    label: "",
    renderCell: (item: any) => item.null || "",
    resize,
  },
];
