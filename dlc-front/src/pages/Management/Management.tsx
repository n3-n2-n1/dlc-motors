import React, { useState, useEffect } from "react";
import IncomeOutcomeForm from "./IncomeOutcomeForm";
import { useSearchContext } from "../../contexts/SearchContext.tsx";
import InventoryForm from "./InventoryForm.tsx";

const Management = () => {
  const { products } = useSearchContext();

  const [tipoMovimiento, setTipoMovimiento] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [selectedOption, setSelectedOption] = useState("");

  const handleTipoMovimientoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionSelection = (option: string) => {
    setSelectedOption(option);

    // Cierra el componente
    setIsOpen(false);
  };

  return (
    <div
      className={`flex flex-col w-full mx-auto shadow-md bg-gray-900 text-white h-screen flex overflow-hidden text-sm p-6 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            Inventario
          </h1>
          <h2 className="text-gray-500">
            Edita, crea y elimina ingresos, egresos e inventario.
          </h2>
        </div>
        <div className="justify-center">
          <div className="mt-6">
          </div>
        </div>
      </div>
      <div className="pt-2 w-full">
        {/* Selector */}
        <div className="mb-4 relative w-full pt-2">
          <label htmlFor="select" className="block text-sm font-medium mb-6 ">
            Seleccione el movimiento a registrar:
          </label>
            <InventoryForm observationsList={[]} products={[]} />
          <div className="mb-4"></div>
          <div className="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-300">
            <div className="cursor-pointer group">

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
