// src/components/HistorialTable/HistorialTable.tsx
import React from "react";
import { useEffect, useState } from "react";
import FiltroFloat from "../SearchFloat/SearchFloat";
import { OutcomeObservations } from "../../routes/routes";
import { fetchErrors, fetchReturns, fetchDelivery, fetchCosts, fetchUser } from "../../utils/Handlers/Handlers";
import { useFilterValues } from "../../contexts/FilterContext";

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
  costImported: costImportedTable[];
}

export const HistorialErrorTable: React.FC<HistorialErrorTableProps> = () => {
  const [historialErrorData, setHistorialErrorData] = useState<Movement[]>([]);

  const { filterValues, applyFilters, applyGlobalSearch, searchTerm } = useFilterValues();

  let filteredData = applyGlobalSearch(historialErrorData, searchTerm); // Apply global search

  const hasFilters = Object.values(filterValues).some((value) => value !== "");
  filteredData = hasFilters
    ? applyFilters(filteredData, filterValues) // Apply column-specific filters to the already filtered data
    : filteredData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchErrors();
        if (response && response.length > 0) {
          setHistorialErrorData(response);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchData();
  }, []);

  console.log("filtro ERRORS", filteredData); // ! Ver si filtra la response OK. => SI

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm">
      <div className="h-full w-full bg-gray-900">
        <div className="py-1 pt-4">
          <div className="overflow-x-auto">
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Fecha/Hora
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Observacion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Detalle
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Codigo Interno
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      OEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripcion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock Actual
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock Real
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Ficha
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Revision
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((move, index) => (
                      <tr tabIndex={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.user}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.fecha}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.observacion}
                          </p>
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.detalle}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.codigoInt}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.codOEM}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.descripcion}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.stock}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.stock}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p>
                            <img src={move.image} alt="" className="h-[40px] w-[40]"/>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {move.estado}
                          </p>
                          {/* // ! Acá iria un select (¿según el rol?) para cambiar el estado de la revisión // Hacer un update a la DB */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1 className="absolute text-3xl mt-4 ml-4 text-white font-weight-300">
                      No hay resultados para esta búsqueda
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HistorialReturnTable: React.FC<HistorialReturnTableProps> = () => {
  const [historialReturnData, setHistorialReturnData] = useState<
    ReturnsTable[]
  >([]);

  const { filterValues, applyFilters, applyGlobalSearch, searchTerm } = useFilterValues();

  let filteredData = applyGlobalSearch(historialReturnData, searchTerm); // Apply global search

  const hasFilters = Object.values(filterValues).some((value) => value !== "");
  filteredData = hasFilters
    ? applyFilters(filteredData, filterValues) // Apply column-specific filters to the already filtered data
    : filteredData;

  useEffect(() => {
    const fetchReturnData = async () => {
      try {
        const response = await fetchReturns();
        if (response && response.length > 0) {
          setHistorialReturnData(response);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchReturnData();
  }, []);

  console.log("filtro RETURNS", filteredData);

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm">
      <div className="h-full w-full bg-gray-900">
        <div className="py-1 pt-4">
          <div className="overflow-x-auto">
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Fecha/Hora
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Observacion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Detalle
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      CodInt
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      OEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripcion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Kit
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock Actual
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contador devoluciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((hist, index) => (
                      <tr tabIndex={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.usuario}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.fecha}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.observacion}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.detalle}
                          </p>
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.codInt}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.oem}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.descripcion}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.cantidad}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.kit}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.detalle}
                            {/* // ! Cambiar por 'stock actual' => Hacer nuevo campo en la tabla */}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.contador}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1 className="absolute text-3xl mt-4 ml-4 text-white font-weight-300">
                      No hay resultados para esta búsqueda
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HistorialInventoryTable: React.FC<HistorialInventoryTableProps> = () => {
  const [historialInventoryData, setHistorialInventoryData] = useState<InventoryTable[]>([]);

  const { filterValues, applyFilters } = useFilterValues();
  const hasFilters = Object.values(filterValues).some((value) => value !== "");
  const filteredData = hasFilters
    ? applyFilters(historialInventoryData, filterValues)
    : historialInventoryData;

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetchHistorial();
        if (response && response.payload.length > 0) {
          // Asumiendo que response.payload ya es del tipo Movement[]
          setHistorialInventoryData(response.payload);
          console.log(historialInventoryData);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchInventoryData();
  }, []);

  console.log("filtro INVENTORY", filteredData);

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm">
      <div className="h-full w-full bg-gray-900">
        <div className="py-1 pt-4">
          <div className="overflow-x-auto">
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Fecha/Hora
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Movimiento
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Observacion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Courier
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Detalle
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cantidad // arr realiz
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Kit
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Codigo Interno
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripcion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      OEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Marca
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Rubro
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Origen
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock // stock ant
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock Actualizado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((hist, index) => (
                      <tr tabIndex={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.fecha}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.usuario}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.movimiento}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.observacion}
                          </p>
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.courier}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.detalle}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.cantidad}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.kit}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.codigoInt}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.descripcion}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.codOEM}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.marca}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.rubro}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.origen}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.stock} // stock anterior
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.stockNuevo} // stock nuevo
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1 className="absolute text-3xl mt-4 ml-4 text-white font-weight-300">
                      No hay resultados para esta búsqueda
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HistorialDeliveryTable: React.FC<HistorialDeliveryTableProps> = () => {
  const [historialDeliveryData, setHistorialDeliveryData] = useState<
    DeliveryTable[]
  >([]);

  const { filterValues, applyFilters } = useFilterValues();
  const hasFilters = Object.values(filterValues).some((value) => value !== "");
  const filteredData = hasFilters
    ? applyFilters(historialDeliveryData, filterValues)
    : historialDeliveryData;

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await fetchDelivery(); // Suponiendo que esta es tu función de API
        if (response && response.length > 0) {
          // Asumiendo que response.payload ya es del tipo Movement[]
          setHistorialDeliveryData(response);
          console.log(historialDeliveryData);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchDeliveryData();
  }, []);

  console.log("filtro DELIVERY", filteredData);

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm">
      <div className="h-full w-full bg-gray-900">
        <div className="py-1 pt-4">
          <div className="overflow-x-auto">
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Fecha/Hora
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Numero Importacion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cod Interno
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripcion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      OEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Productos
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock en Depósito
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock Acumulado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((hist, index) => (
                      <tr tabIndex={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.date}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.usuario}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.movementType}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.observations}
                          </p>
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.courier}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.descripcion}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.cantidad}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.kit}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.codigoInt}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hist.stock}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1 className="absolute text-3xl mt-4 ml-4 text-white font-weight-300">
                      No hay resultados para esta búsqueda
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CostImportedTable: React.FC<CostImportedTableProps> = () => {
  const [costImportedData, setData] = useState<CostImportedTable[]>([]);
  useEffect(() => {
    const fetchCostsData = async () => {
      try {
        const response = await fetchCosts();
        if (response && response.length > 0) {
          setData(response);
          console.log(costImportedData);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchCostsData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm">
      <div className="h-full w-full bg-gray-900">
        <div className="py-1 pt-4">
          <div className="overflow-x-auto">
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Codigo
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      OEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripcion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Rubro
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Marcas Compatibles
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Dev
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      YAOPEI
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      IOCE
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      YARN
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ZONLIN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costImportedData.map((hist, index) => (
                    <tr tabIndex={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.codigo}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.sku}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.oem}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.descripcion}
                        </p>
                      </td>{" "}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.rubro}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.marcas}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.stock}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.oem}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.stock}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CostResaleTable: React.FC<CostImportedTableProps> = () => {
  const [costImportedData, setData] = useState<CostImportedTable[]>([]);
  useEffect(() => { 
    const fetchCostsData = async () => {
      try {
        const response = await fetchCosts();
        if (response && response.length > 0) {
          setData(response);
          console.log(costImportedData);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchCostsData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm">
      <div className="h-full w-full bg-gray-900">
        <div className="py-1 pt-4">
          <div className="overflow-x-auto">
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Codigo
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      OEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripcion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Rubro
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Marcas Compatibles
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Dev
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      YAOPEI
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      IOCE
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      YARN
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ZONLIN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costImportedData.map((hist, index) => (
                    <tr tabIndex={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.codigo}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.sku}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.oem}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.descripcion}
                        </p>
                      </td>{" "}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.rubro}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.marcas}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.stock}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.oem}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.stock}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CostFabricTable: React.FC<CostImportedTableProps> = () => {
  const [costImportedData, setData] = useState<CostImportedTable[]>([]);
  useEffect(() => { 
    const fetchCostsData = async () => {
      try {
        const response = await fetchCosts();
        if (response && response.length > 0) {
          setData(response);
          console.log(costImportedData);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchCostsData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm">
      <div className="h-full w-full bg-gray-900">
        <div className="py-1 pt-4">
          <div className="overflow-x-auto">
            <div className="shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Codigo
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      OEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripcion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Rubro
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Marcas Compatibles
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Dev
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      YAOPEI
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      IOCE
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      YARN
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ZONLIN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costImportedData.map((hist, index) => (
                    <tr tabIndex={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.codigo}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.sku}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.oem}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.descripcion}
                        </p>
                      </td>{" "}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.rubro}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.marcas}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.stock}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.oem}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.proveedores}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {hist.stock}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
