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
  const [isOpen, setIsOpen] = useState(true);

  const [selectedOption, setSelectedOption] = useState("");

  const handleTipoMovimientoChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionSelection = (option: string) => {
    setSelectedOption(option);

    // Cierra el componente
    setIsOpen(false);
  };

  

  useEffect(() => {
    setIsOutcome(tipoMovimiento === "egreso");
  }, [tipoMovimiento]);

  return (
    <div className={`flex flex-col w-full mx-auto shadow-md bg-gray-900 text-white h-screen flex overflow-hidden text-sm p-6 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-4xl mb-2 text-white font-weight-300">Movimientos</h1>
          <h2 className="text-gray-500">Edita, crea y elimina ingresos, egresos e inventario.</h2>
        </div>
        <div className="justify-center">
          <div className="mt-6"></div>
        </div>
      </div>
      <div className="pt-2 w-full">
        {/* Selector */}
        <div className="mb-4 relative w-full pt-2">
          <label
            htmlFor="select"
            className="block text-sm font-medium mb-6 "
          >
            Seleccione el movimiento a registrar:
          </label> 
          <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
          <option value="inventario">Inventario</option>

          </select>
          <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-300">
            <div className="cursor-pointer group">
              <a
                className={`block p-2 border-transparent border-l-4 group-hover:border-blue-600 ${
                  selectedOption === "ingreso" ? "group-hover:bg-gray-100" : ""
                }`}
                onClick={() => setSelectedOption("ingreso")}
              >
                Ingreso
              </a>
            </div>
            <div className="cursor-pointer group border-t">
              <a
                className={`block p-2 border-transparent border-l-4 group-hover:border-blue-600 ${
                  selectedOption === "egreso" ? "group-hover:bg-gray-100" : ""
                }`}
                onClick={() => setSelectedOption("egreso")}
              >
                Egreso
              </a>
            </div>
            <div className="cursor-pointer group border-t">
              <a
                className={`block p-2 border-transparent border-l-4 group-hover:border-blue-600 ${
                  selectedOption === "inventario" ? "group-hover:bg-gray-100" : ""
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
