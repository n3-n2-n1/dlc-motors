export interface IProduct {
  Codigo: string;
  Producto: string;
  Rubro: string;
  CodBarras: string;
  Precio: string;
  Stock: string;
  CodOEM: string;
}

export interface NewIProduct {
  codigoInt: string,
  codOEM: string,
  codTango: string,
  descripcion: string,
  rubro:string,
  origen: string,
  marcasCompatibles: string[],
  newCompatibleBrand: string | string[],
  stock: any,
  hasStock: boolean,
  imagen: any,
  contadorDevoluciones: number,
  kit: boolean,
  tag: string,
  precio: any,
}
