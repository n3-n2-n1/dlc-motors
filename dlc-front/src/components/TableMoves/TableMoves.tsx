

export interface CostImportedTable {
  codigo?: string;
  sku?: string;
  descripcion?: string;
  rubro?: string;
  marcas?: string;
  stock?: number;
  proveedores?: any;
  oem?: any;
}

export interface Movement {
  id: number | null;
  user: string;
  fecha: string;
  observacion: string;
  detalle?: string;
  codigoInt?: string;
  stock?: number;
  cantidad?: number;
  descripcion?: string;
  image?: string;
  codOEM?: string;
  estado?: string;
}

export interface ReturnsTable {
  id: number | null;
  usuario?: string;
  fecha: string;
  observacion: string;
  detalle?: string;
  codInt?: string;
  oem?: string;
  movimiento?: string;
  cantidad?: number;
  descripcion?: string;
  kit?: string;
  contador?: number;
}

export interface InventoryTable {
  id: number | null;
  fecha: string;
  observacion: string;
  movimiento?: string;
  descripcion?: string;
  courier?: string;
  detalle?: string;
  cantidad?: number;
  kit?: string;
  codigoInt?: string;
  codOEM?: string;
  marca?: string;
  rubro?: string;
  origen?: string;
  stock?: number;
  stockNuevo?: number;
  usuario?: string;
}

export interface DeliveryTable {
  id: number | null;
  fecha: string;
  observacion: string;
  movimiento?: string;
  descripcion?: string;
  cantidad?: number;
  codigoInt?: string;
  codOEM?: string;
  origen?: string;
  stock?: number;
}

interface HistorialErrorTableProps {
  historialError: Movement[];
}

interface HistorialReturnTableProps {
  historialReturn: ReturnsTable[];
}

interface HistorialInventoryTableProps {
  historialInventory: InventoryTable[];
}

interface HistorialDeliveryTableProps {
  historialDelivery: DeliveryTable[];
}

interface CostImportedTableProps {
  costImported: CostImportedTable[];
}


