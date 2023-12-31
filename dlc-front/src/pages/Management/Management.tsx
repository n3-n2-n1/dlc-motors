import { useState, useEffect } from "react";
import IncomeOutcomeForm from "./IncomeOutcomeForm";

import { useSearchContext } from "../../contexts/SearchContext.tsx";
import InventoryForm from "./InventoryForm.tsx";

const IncomeObservations = [
  "Cancelación",
  "Devolución",
  "Error",
  "Fábrica",
  "Importación",
  "Compra a terceros",
  "Otro",
  "Armado de kits",
];

const OutcomeObservations = [
  "ML",
  "FLEX",
  "FLEX G",
  "DML",
  "ML LAURA",
  "MLF",
  "TRANSFERENCIA",
  "EFECTIVO",
  "CTA CTE",
  "CAMBIO POR FALLA",
  "CAMBIO POR OTRO PRODUCTO",
  "MOTO",
  "MKP",
  "VENTA EN LOCAL",
  "OTRO",
  "ERROR",
  "Para armar kits",
];

const Management = () => {
  const { products } = useSearchContext();

  const [tipoMovimiento, setTipoMovimiento] = useState<string>("");
  const [isOutcome, setIsOutcome] = useState(false);

  const handleTipoMovimientoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTipoMovimiento(event.target.value);
  };

  useEffect(() => {
    setIsOutcome(tipoMovimiento === "egreso");
  }, [tipoMovimiento]);

  return (
    <div className="flex flex-col w-full mx-auto bg-white p-8 shadow-md bg-gray-100 dark:bg-gray-900  text-gray-600 h-screen flex overflow-hidden text-sm">
      <h2 className="text-2xl font-semibold mb-4">Registro de Movimientos</h2>

      <div className="pt-12 w-full">
        {/* Selector */}
        <div className="mb-4 w-full">
          <label
            htmlFor="movimiento"
            className="block text-sm font-medium text-gray-600"
          >
            Seleccione el tipo de movimiento:
          </label>
          <select
            id="movimiento"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={tipoMovimiento}
            onChange={handleTipoMovimientoChange}
          >
            <option value="">Seleccione...</option>
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
            <option value="inventario">Inventario</option>
          </select>
        </div>

        {/* Formulario para Ingreso */}

        {tipoMovimiento === "ingreso" && (
          <div className="mb-4">
            {/* INPUTS */}
            {/* Fecha (Se carga automaticamente) */}
            {/* Tipo (Se carga automaticamente) */}
            {/* Observaciones (Select con estas opciones => {
            - Cancelación		
            - Devolución		
            - Error		
            - Fábrica		
            - Importación	(Si se elije, se tiene que agregar otro input de texto para indicar el número de importacion)
            - Compra a terceros		
            - Otro		
            - Armado de kits
          }) */}

            {/* Detalle (Input de texto) No obligatorio y que tenga historial de autocompletado // Replantear lo del autocompletado */}
            {/* Cantidad (Input number sin valor default) */}
            {/* OEM Producto (input string código barras) (Debe parsearlo a mayuscula para que se reconozca de todas maneras) */}
            {/* Stock resultante tras el movimiento a realizar (Se carga automaticamente) */}
            <IncomeOutcomeForm
              isOutcome={isOutcome}
              observationsList={IncomeObservations}
              products={products}
            />

            {/* Agrega los demás campos según tu necesidad */}
          </div>
        )}

        {/* Formulario para Egreso */}
        {tipoMovimiento === "egreso" && (
          <div className="mb-4">
            {/* INPUTS */}
            {/* Fecha (Se carga automaticamente) */}
            {/* Tipo (Se carga automaticamente) */}
            {/* Observaciones (Select con estas opciones => {
            ML,
            FLEX,
            FLEX G,
            DML,
            ML LAURA,
            MLF,
            TRANSFERENCIA,
            EFECTIVO,
            CTA CTE,
            CAMBIO POR FALLA,
            CAMBIO POR OTRO PRODUCTO,
            MOTO,
            MKP,
            VENTA EN LOCAL,
            OTRO,
            ERROR,
            Para armar kits,
          }) */}

            {/* Detalle (Input de texto) No obligatorio y que tenga historial de autocompletado // Replantear lo del autocompletado */}
            {/* Cantidad (Input number default = 1) => aca está descontando*/}
            {/* OEM Producto (input string código barras) (Debe parsearlo a mayuscula para que se reconozca de todas maneras) */}
            {/* Stock resultante tras el movimiento a realizar (Se carga automaticamente) */}

            {/* cambia cantidad default a 1 */}
            {/* cambia lista de observaciones */}
            <IncomeOutcomeForm
              isOutcome={isOutcome}
              observationsList={OutcomeObservations}
              products={products}
            />
          </div>
        )}

        {/* Formulario para Inventario */}
        {tipoMovimiento === "inventario" && (
          <div className="mb-4">
            <InventoryForm isOutcome={isOutcome} observationsList={OutcomeObservations} products={products} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
