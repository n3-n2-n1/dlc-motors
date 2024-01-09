export interface IProduct {
  Codigo: string;
  Producto: string;
  Rubro: string;
  CodBarras: string;
  Precio: string;
  Stock: string;
}

export interface NewIProduct {
  pieceCode: string;
  OEMCode: string;
  tangoCode: string;
  description: string;
  category: string;
  origin: string;
  compatibleBrands: string[];
  newCompatibleBrand: string;
  stock: number | null;
  hasStock: boolean;
  picture: string; // ! Robar de Libertapp? Anular temporalmente
  brokenOrReturned: number;
  kit: boolean;
  tag: string;
  price: number | null;
}
