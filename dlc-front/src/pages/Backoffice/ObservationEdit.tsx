import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext";
import { updateObservations } from "../../utils/Handlers/Handlers";

function ObservationEdit() {
  const {
    errorsObservations,
    incomesObservations,
    outcomesObservations,
    returnsObservations,
  } = useBrandsObservations();

  const [selectedArray, setSelectedArray] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [arrays, setArrays] = useState({
    errorsObservations,
    incomesObservations,
    outcomesObservations,
    returnsObservations,
  });

  const handleSelect = (e) => {
    setSelectedArray(e.target.value);
    setSelected(true);
  };

  const handleEdit = (index) => {
    setSelectedIndex(index);
  };

  const handleDelete = (index) => {
    setArrays({
      ...arrays,
      [selectedArray]: arrays[selectedArray].filter((_, i) => i !== index),
    });
  };

  const handleAdd = () => {
    setArrays({
      ...arrays,
      [selectedArray]: [...arrays[selectedArray], ""],
    });
  };

  const handleSave = (index, value) => {
    let newArray = [...arrays[selectedArray]];
    newArray[index] = value;
    setArrays({
      ...arrays,
      [selectedArray]: newArray,
    });
    setSelectedIndex(null);
  };

  const handleSubmit = () => {
    updateObservations(arrays);
  };

  const displayNameMapping = {
    errorsObservations: "Errores",
    incomesObservations: "Ingresos",
    outcomesObservations: "Egresos",
    returnsObservations: "Devoluciones",
  };

  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="p-4 md:p-6 dark:bg-gray-900  dark:text-white">
        <Navbar title="Observaciones" subtitle="¿Qué información querés editar?" />
        <div>
          <select
            onChange={handleSelect}
            className="block p-2 border border-gray-100 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-200 dark:bg-gray-700 mb-4"
          >
            <option value="">Elige un tipo de dato...</option>
            {Object.keys(arrays).map((key) => (
              <option key={key} value={key}>
                {displayNameMapping[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-auto max-h-[75vh] transition-colors duration-300">
          <hr />

          {selectedArray &&
            arrays[selectedArray].map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between gap-4 my-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm"
              >
                {selectedIndex === index ? (
                  <input
                    defaultValue={item}
                    onBlur={(e) => handleSave(index, e.target.value)}
                    className="w-full bg-gray-400 rounded-md p-1"
                  />
                ) : (
                  <div className="flex-1">
                    <div className="font-bold">{item}</div>
                  </div>
                )}
                <div className="py-1 flex gap-2">
                  <button
                    className="px-2 py-0.5 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-xl"
                    onClick={() => handleEdit(index)}
                  >
                    🖋️
                  </button>
                  <button
                    className="px-2 py-0.5 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-xl text-white font-semibold"
                    onClick={() => handleDelete(index)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="py-3 gap-3 flex">
          <div>
            {selected && (
              <button
                className="bg-white dark:bg-black dark:text-white font-semibold p-2 rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600"
                onClick={handleSubmit}
              >
                Guardar cambios
              </button>
            )}
          </div>
          <div>
            {selectedArray && (
              <button
                className="bg-green-800 p-2 rounded-xl text-white hover:bg-green-900"
                onClick={handleAdd}
              >
                Agregar nueva observación
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ObservationEdit;
