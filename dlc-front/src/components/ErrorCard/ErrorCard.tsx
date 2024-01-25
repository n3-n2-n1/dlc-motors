import React, { useState, useEffect } from "react";
import { fetchErrors } from "../../utils/Handlers/Handlers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Actions from "../Actions/Actions";
import OptionsIcon from "../icon/OptionsIcon/OptionsIcon";

export interface Errors {
  cantidad: string;
  detalle: string;
  observaciones: string;
  oemProducto: string;
}

const ErrorCard = () => {
  const [errorData, setErrorData] = useState<Errors[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isEditing, setIsEditing] = useState<boolean[]>(
    new Array(errorData.length).fill(false)
  );
  const [editableErrors, setEditableErrors] = useState<Errors[]>([
    ...errorData,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchErrors();
        setErrorData(data);
        setIsEditing(new Array(data.length).fill(false)); // Inicializa isEditing
        setEditableErrors([...data]); // Inicializa editableErrors
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!errorData) {
    return <div>Cargando errores...</div>; // O algún indicador de carga
  }

  const toggleEdit = (index: number) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = !newIsEditing[index];
    setIsEditing(newIsEditing);

    if (!newIsEditing[index]) {
      console.log("Guardar datos: ", editableErrors[index]);
      // Aquí puedes implementar la lógica para guardar los cambios
    }
  };

  const handleChange = (index: number, field: keyof Errors, value: string) => {
    const updatedErrors = [...editableErrors];
    updatedErrors[index] = { ...updatedErrors[index], [field]: value };
    setEditableErrors(updatedErrors);
  };

  const handleSave = (index: number) => {
    toggleEdit(index); // Desactiva el modo de edición

    // Aquí puedes manejar el envío de datos a tu backend, por ejemplo:
    // saveErrorDataToServer(editableErrors[index]);

    // O si necesitas los datos en formato JSON:
    const json = JSON.stringify(editableErrors[index]);
    console.log("Datos guardados en JSON:", json);
  };

  return (
    <div className="flex flex-col bg-gray-900 bg-gray-100 bg-gray-900 dark:text-white text-gray-600 flex overflow-auto text-sm pt-6">
      <div className="flex-row">
        <h1 className="text-3xl mb-2 text-white font-weight-300 mb-4">
          Historial de Errores
        </h1>
      </div>
      {errorData.map((error, index) => (
        <div
          key={index}
          className="rounded-lg bg-white dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl mb-4"
        >
          <div className="p-6">
            {isEditing[index] ? (
              <div>
                <h2>Nuevo Detalle</h2>

                <input
                  type="text"
                  value={editableErrors[index].detalle}
                  onChange={(e) =>
                    handleChange(index, "detalle", e.target.value)
                  }
                />

                <h2>Nuevo SKU</h2>
                <input
                  type="text"
                  value={editableErrors[index].oemProducto}
                  onChange={(e) =>
                    handleChange(index, "oemProducto", e.target.value)
                  }
                />


                <h2>Nueva cantidad</h2>
                 <input
                  type="text"
                  value={editableErrors[index].cantidad}
                  onChange={(e) =>
                    handleChange(index, "cantidad", e.target.value)
                  }
                />


                <h2>Nueva observacion</h2>
                <input
                  type="text"
                  value={editableErrors[index].observaciones}
                  onChange={(e) =>
                    handleChange(index, "observaciones", e.target.value)
                  }
                />
                <div className="pt-4 pb-6">
                <button className="rounded rounded-full bg-blue-800 p-2 text-white" onClick={() => handleSave(index)}>
                  Guardar
                </button>
                </div>
                <img src="../../../public/logo.png" alt="" />

              </div>
            ) : (
              <div>
                <h3 className="text-slate-900 dark:text-white mt-1 text-lg font-medium tracking-tight">
                  Error: {error.detalle}
                </h3>
                <div>
                  <h3 className="text-slate-900 dark:text-white text-lg font-medium tracking-tight">
                    {/* {error.Fecha} */}09/01/12
                  </h3>
                </div>
                <p className="text-slate-900 dark:text-slate-400 text-lg">
                  {error.observaciones}
                </p>
                <p className="text-slate-900 dark:text-slate-400 text-lg">
                  Cantidad: {error.cantidad}
                </p>
                <h3 className="text-slate-900 dark:text-white mt-1 text-lg font-medium tracking-tight">
                  Error: {error.detalle}
                </h3>
                <h3 className="text-slate-900 dark:text-white mt-1 text-lg font-medium tracking-tight">
                  Origen: {error.observaciones}
                </h3>
                <h3 className="text-slate-900 dark:text-white mt-1 text-lg font-medium tracking-tight">
                  CodBarras: {error.oemProducto}
                </h3>

                <div className="w-[180px] flex flex-row items-center">
                <h3 className="text-slate-900 dark:text-white mt-1 text-lg font-medium tracking-tight">
                  Imagen:
                </h3>
                <img src="../../../public/logo.png" alt="" />
                </div>
              </div>
            )}
            <button onClick={() => toggleEdit(index)}>
              <OptionsIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorCard;
