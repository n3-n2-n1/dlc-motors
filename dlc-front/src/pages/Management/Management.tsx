import React, { useState, useEffect } from "react";
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
  
  const [tipoMovimiento, setTipoMovimiento] = useState("");
  const [isOutcome, setIsOutcome] = useState(false);



  const [selectedOption, setSelectedOption] = useState("");

  const handleTipoMovimientoChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  

  useEffect(() => {
    setIsOutcome(tipoMovimiento === "egreso");
  }, [tipoMovimiento]);

  return (
    <div className="flex flex-col w-full mx-auto bg-white p-8 shadow-md bg-gray-100 dark:bg-gray-900 text-gray-600 h-screen flex overflow-hidden text-sm">
      <h2 className="text-2xl font-semibold mb-4">Registro de Movimientos</h2>

      <div className="pt-2 w-full">
        {/* Selector */}
        <div className="mb-4 relative w-full">
          <label
            htmlFor="select"
            className="block text-sm font-medium text-gray-600"
          >
            Seleccione el movimiento a registrar:
          </label>
          <div className="relative">
            <div className="h-10 bg-white flex border border-gray-300 rounded items-center">
              <input
                disabled
                name="select"
                id="select"
                className="px-4 appearance-none outline-none text-gray-800 w-full"
                readOnly
              />
              <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
                <svg
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <label
                htmlFor="show_more"
                className="cursor-pointer outline-none focus:outline-none border-l border-gray-300 transition-all text-gray-300 hover:text-gray-600"
              >
                <svg
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </label>
            </div>
          </div>
          <input
            type="checkbox"
            name="show_more"
            id="show_more"
            className="peer hidden"
            value={selectedOption}
          />
          <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-300">
            <div className="cursor-pointer group">
            <a
                className={`block p-2 border-transparent border-l-4 group-hover:border-blue-600 ${
                  selectedOption === "egreso" ? "group-hover:bg-gray-100" : ""
                }`}
                onClick={() => setSelectedOption("egreso")}
              >
                Ingreso
              </a>
            </div>
            <div className="cursor-pointer group border-t">
            <a
                className={`block p-2 border-transparent border-l-4 group-hover:border-blue-600 ${
                  selectedOption === "egreso" ? "group-hover:bg-gray-100" : ""
                }`}
                onClick={() => setSelectedOption("ingreso")}
              >
                Egreso
              </a>
            </div>
            <div className="cursor-pointer group border-t">
            <a
                className={`block p-2 border-transparent border-l-4 group-hover:border-blue-600 ${
                  selectedOption === "egreso" ? "group-hover:bg-gray-100" : ""
                }`}
                onClick={() => setSelectedOption("inventario")}
              >
                Inventario
              </a>
            </div>
          </div>
        </div>

        {/* Formulario para Ingreso */}
        {selectedOption === "ingreso" && (
          <div className="mb-4">
            <IncomeOutcomeForm
              isOutcome={isOutcome}
              observationsList={IncomeObservations}
              products={products}
            />
          </div>
        )}

        {/* Formulario para Egreso */}
        {selectedOption === "egreso" && (
          <div className="mb-4">
            <IncomeOutcomeForm
              isOutcome={isOutcome}
              observationsList={OutcomeObservations}
              products={products}
            />
          </div>
        )}

        {/* Formulario para Inventario */}
        {selectedOption === "inventario" && (
          <div className="mb-4">
            <InventoryForm
              isOutcome={isOutcome}
              observationsList={OutcomeObservations}
              products={products}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
