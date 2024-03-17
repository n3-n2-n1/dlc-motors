import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext.tsx";

const resize = { resizerHighlight: "#dee2e6", minWidth: 25 };
const hiddenColumns = [""];

const ActionCell = ({ codigoInt }: any) => {
  const { handleDeleteModal } = useBrandsObservations();

  return (
    <div className="flex flex-row gap-2 w-full">
      <Link to={`/productos/editar/${codigoInt}`}>
        <button className={`w-7 p-1 hover:bg-gray-500 rounded-3xl`}>
          🖋️
        </button>
      </Link>
      <button
        className={`w-7 p-1 hover:bg-gray-500 rounded-3xl`}
        onClick={() => handleDeleteModal(codigoInt)}
      >
        ❌
      </button>
    </div>
  );
};

export const PRODUCTCOLUMNS = [
  {
    label: "⚙️",
    renderCell: (item: any) => <ActionCell codigoInt={item.codigoInt} />,
    resize,
  },
  {
    label: "Código Interno",
    renderCell: (item: any) => item.codigoInt,
    resize,
    hide: hiddenColumns.includes("Código Interno"),
  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU,
    resize,
    hide: hiddenColumns.includes("SKU"),
    sort: { sortKey: "SKU" },
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro,
    resize,
    hide: hiddenColumns.includes("Rubro"),
  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.descripcion,
    resize,
    hide: hiddenColumns.includes("Descripción"),
    sort: { sortKey: "DESCRIPCION" },
  },
  {
    label: "Origen",
    renderCell: (item: any) => item.origen,
    resize,
    hide: hiddenColumns.includes("Origen"),
    sort: { sortKey: "ORIGEN" },
  },
  {
    label: "Marcas",
    renderCell: (item: any) => item.marcasCompatibles,
    resize,
    hide: hiddenColumns.includes("Marcas Compatibles"),
  },
  {
    label: "Kit",
    renderCell: (item: any) => item.kit,
    resize,
    hide: hiddenColumns.includes("Kit"),
  },
  {
    label: "Dev",
    renderCell: (item: any) => item.contadorDevoluciones,
    resize,
    hide: hiddenColumns.includes("Contador Devoluciones"),
  },
  {
    label: "☑️",
    renderCell: (item: any) => (item.check ? "Sí" : "No"),
    resize,
    hide: hiddenColumns.includes("Check"),
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock,
    resize,
    hide: hiddenColumns.includes("Stock"),
    sort: { sortKey: "STOCK" },
  },
];

//Fecha/hora	Aviso	Imagen	Código interno	Descripción		OEM	Marca	Rubro	Origen	Stock
export const NOTIFCOLUMNS = [
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha,
    resize,
  },
  {
    label: "Aviso",
    renderCell: (item: any) => item.message,
    resize,
  },
  {
    label: "Imagen",
    renderCell: (item: any) => item.image,
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codInterno,
    resize,
  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.name,
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.oem,
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca,
    resize,
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro,
    resize,
  },
  {
    label: "Origen",
    renderCell: (item: any) => item.origen,
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock,
    resize,
  },
];

// Fecha/hora	Observcación	Número de impo	Cantidad	Código interno	Descripción	OEM	Productos	Stock en depósito	Stock acumulado
export const DELIVERYCOLUMNS = [
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha,
    resize,
  },
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones,
    resize,
  },
  {
    label: "Num. Impo.",
    renderCell: (item: any) => item.numImpo,
    resize,
  },
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad,
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codigoInt,
    resize,
  },
  {
    label: "Descripcion",
    renderCell: (item: any) => item.desc,
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM,
    resize,
  },
  {
    label: "Productos",
    renderCell: (item: any) => item.productos,
    resize,
  },
  {
    label: "Stock deposito",
    renderCell: (item: any) => item.stockDeposito,
    resize,
  },
  {
    label: "Stock Acumulado",
    renderCell: (item: any) => item.stockAcumulado,
    resize,
  },
];

//Usuario	Fecha/hora	Observcación	Detalle	Código interno	OEM	Descripción	Stock actual	Stock real 	Foto ficha	Revisión
export const ERRORCOLUMNS = [
  {
    label: "Usuario",
    renderCell: (item: any) => item.user,
    resize,
  },
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha,
    resize,
  },
  {
    label: "Observación",
    renderCell: (item: any) => item.observaciones,
    resize,
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.det,
    resize,
  },
  {
    label: "Código Interno",
    renderCell: (item: any) => item.codInterno,
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM,
    resize,
  },
  {
    label: "Descripción",
    renderCell: (item: any) => item.desc,
    resize,
  },
  {
    label: "Stock Actual",
    renderCell: (item: any) => item.stockActual,
    resize,
  },
  {
    label: "Stock Real",
    renderCell: (item: any) => item.stockReal,
    resize,
  },
  {
    label: "Imagen",
    renderCell: (item: any) => item.img,
    resize,
  },
  {
    label: "Revisión",
    renderCell: (item: any) => item.estado,
    resize,
  },
];

//Fecha/hora	Usuario	Tipo de mov	Observcación	Courrier/pedido	Detalle	Cantidad	Kit	Código interno	Descripción	OEM	Marca	Rubro	Origen	Stock
export const MOVESCOLUMNS = [
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha,
    resize,
  },
  {
    label: "Movimiento",
    renderCell: (item: any) => item.tipoMov,
    resize,
  },
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones,
    resize,
  },
  {
    label: "Courier",
    renderCell: (item: any) => item.det,
    resize,
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.det,
    resize,
  },
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad,
    resize,
  },
  {
    label: "Kit",
    renderCell: (item: any) => item.kit,
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codigoInt,
    resize,
  },
  {
    label: "Descripcion",
    renderCell: (item: any) => item.desc,
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM,
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock,
    resize,
  },
];

export const HOMECOLUMNS = [
  {
    label: "Ultimos Movimientos",
    renderCell: (item: any) => item.codigoInt,
    resize,
    
  },
   
];




// Usuario	Fecha/hora	Observcación	Detalle	Código interno	OEM	Descripción	Cantidad	Kit	Stock actual	Contador de dev
export const RETURNCOLUMNS = [
  {
    label: "Usuario",
    renderCell: (item: any) => item.usuario,
    resize,
  },
  {
    label: "Fecha",
    renderCell: (item: any) => item.fecha,
    resize,
  },
  {
    label: "Observacion",
    renderCell: (item: any) => item.observaciones,
    resize,
  },
  {
    label: "Detalle",
    renderCell: (item: any) => item.detalle,
    resize,
  },
  {
    label: "Codigo Interno",
    renderCell: (item: any) => item.codIntermp,
    resize,
  },
  {
    label: "OEM",
    renderCell: (item: any) => item.codOEM,
    resize,
  },
  {
    label: "Descripcion",
    renderCell: (item: any) => item.desc,
    resize,
  },
  {
    label: "Cantidad",
    renderCell: (item: any) => item.cantidad,
    resize,
  },
  {
    label: "Kit",
    renderCell: (item: any) => item.kit,
    resize,
  },
  {
    label: "Contador Dev",
    renderCell: (item: any) => item.contador,
    resize,
  },
];


export const IMPORTEDCOLUMNS = [
  {
    label: "Descripcion",
    renderCell: (item: any) => item.descripcion,
    resize,
  },
  {
    label: "Código",
    renderCell: (item: any) => item.codigo,
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca,
    resize,
  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU,
    resize,
  },
  {
    label: "Proveedores",
    renderCell: (item: any) => item.proveedores,
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock,
    resize,
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro,
    resize,
  },
];

export const RESALECOLUMNS = [
  {
    label: "Descripcion",
    renderCell: (item: any) => item.descripcion,
    resize,
  },
  {
    label: "Código",
    renderCell: (item: any) => item.codigo,
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca,
    resize,
  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU,
    resize,
  },
  {
    label: "Proveedores",
    renderCell: (item: any) => item.proveedores,
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock,
    resize,
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro,
    resize,
  },
];

export const COLUMNSFABRIC =[
  {
    label: "Descripcion",
    renderCell: (item: any) => item.descripcion,
    resize,
  },
  {
    label: "Código",
    renderCell: (item: any) => item.codigo,
    resize,
  },
  {
    label: "Marca",
    renderCell: (item: any) => item.marca,
    resize,
  },
  {
    label: "SKU",
    renderCell: (item: any) => item.SKU,
    resize,
  },
  {
    label: "Proveedores",
    renderCell: (item: any) => item.proveedores,
    resize,
  },
  {
    label: "Stock",
    renderCell: (item: any) => item.stock,
    resize,
  },
  {
    label: "Rubro",
    renderCell: (item: any) => item.rubro,
    resize,
  },
];
