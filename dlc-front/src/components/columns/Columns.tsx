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

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    if (newStatus === "Cancelado") {
      setIsCancelled(true);
    }

    const deliveryUpdates = {
      ...item,
      estado: newStatus,
    };
    updateDelivery(deliveryUpdates);
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
          <option value="a corregir">A corregir</option>
          <option value="corregido">Corregido</option>
          <option value="revision">En revisión</option>
        </select>
      ) : (
        <p className="text-center text-white">{item.estado}</p>
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
  },
  {
    label: "Kit",
    renderCell: (item: any) => {
      return Array.isArray(item.kit) ? item.kit.join(" / ") : item.kit || "-";
    },
    resize,
    hide: hiddenColumns.includes("Kit"),
  },
  {
    label: "Dev",
    renderCell: (item: any) => item.contadorDevoluciones || "-",
    resize,
    hide: hiddenColumns.includes("Contador Devoluciones"),
  },
  {
    label: "Stock",
    renderCell: (item: any) => <RenderStockColumn item={item} />,
    resize,
    hide: hiddenColumns.includes("Stock"),
    sort: { sortKey: "STOCK" },
  },
  {
    label: "StockFuturo",
    renderCell: (item: any) => item.stockFuturo || "-",
    resize,
    sort: { sortKey: "STOCKfuturo" },
  },
  {
    label: "☑️",
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
    label: <div className="">Estado</div>,
    renderCell: (item: any) => {
      let bgColorClass = "";
      let bgColorText = "";

      if (item.message === "Stock bajo") {
        bgColorClass = "bg-orange-300"; // Cambia a amarillo para "Stock bajo"
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
  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.name || "-",
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca || "-",
    resize,
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro || "-",
    resize,
  },
  {
    label: "Origen",
    renderCell: (item: any) => item.origen || "-",
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock || "-",
    resize,
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
  },
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha || "-",
    resize,
  },
  {
    label: "Observación",
    renderCell: (item: any) => item.observaciones || "-",
    resize,
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.det || "-",
    resize,
  },
  {
    label: "Código Interno",
    renderCell: (item: any) => item.codInterno || "-",
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.desc || "-",
    resize,
  },
  {
    label: "Stock Actual",
    renderCell: (item: any) => item.stock || "-",
    resize,
  },
  {
    label: "Stock Real",
    renderCell: (item: any) => item.stockReal || "-",
    resize,
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
  },
];

export const MOVESCOLUMNS = [
  {
    label: "Usuario",
    renderCell: (item: any) => <div className="ml-2">{item.user}</div> || "-",
    resize,
  },
  {
    label: "Fecha",
    renderCell: (item: any) => <div className="">{item.fecha}</div> || "-",
    resize,
  },
  {
    label: "Movimiento",
    renderCell: (item: any) => item.tipoMov || "-",
    resize,
  },
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones || "-",
    resize,
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.det || "-",
    resize,
  },
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad || "-",
    resize,
  },
  {
    label: "Kit",
    renderCell: (item: any) => item.kit || "-",
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codigoInt,
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
    label: "Stock",
    renderCell: (item: any) => {
      if (item.tipoMov === "Ingreso") {
        return item.stock + item.cantidad;
      } else if (item.tipoMov === "Egreso") {
        return item.stock - item.cantidad;
      } else {
        return item.stock;
      }
    },
    resize,
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
  },
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha || "-",
    resize,
  },
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones || "-",
    resize,
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.detalle || "-",
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codIntermp || "-",
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM || "-",
    resize,
  },
  {
    label: "Descripcion",
    renderCell: (item: any) => item.desc || "-",
    resize,
  },
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad || "-",
    resize,
  },
  {
    label: "Kit",
    renderCell: (item: any) => item.kit || "-",
    resize,
  },
  {
    label: "Contador Dev",
    renderCell: (item: any) => item.contador || "-",
    resize,
  },
];

export const IMPORTEDCOLUMNS = [
  {
    label: "Descripcion",
    innerWidth: 120,
    renderCell: (item: any) =>
      <div className="p-2">{item.descripcion}</div> || "-",
    resize,
  },
  {
    label: "Código",
    renderCell: (item: any) => item.codInterno || "-",
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marcasCompatibles || "-",
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