export interface IProduct {
  Codigo: string;
  Producto: string;
  Rubro: string;
  CodBarras: string;
  Stock: string;
  CodOEM: string;
}

export interface NewIProduct {
  codigoInt: string;
  codOEM: string;
  SKU: string;
  descripcion: string;
  rubro: string;
  origen: string;
  marcasCompatibles: string[];
  newCompatibleBrand: string | string[];
  stock: any;
  imagen: any;
  contadorDevoluciones: number;
  esKit: boolean;
  kit: number[];
  newKitNumber: number;
  check: string;
}
