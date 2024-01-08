import { fetchHistorial } from "../../utils/Handlers/Handlers";
import { useEffect } from "react";
import { Historial } from "../../Interfaces/Historial";
import { useState } from "react";

const Moves: React.FC = () => {
  const [historial, setHistorial] = useState<Historial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historialData = await fetchHistorial();
        setHistorial(historialData as any);
      } catch (error) {
        // Handle the error here if needed
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 py-10 bg-gray-100 bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm p-6">
              <div className="flex-row">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            Historial de Movimientos
          </h1>
          <h2 className="text-gray-500 mb-4">
            Visualizá sobre movimientos de inventario <br />
            <span className="text-xs underline">
              Lo usamos para arreglar el stock de las cosas que contamos y nos
              dan mal
            </span>
          </h2>
		  </div>
	  <div className="container h-full mx-auto px-4 sm:px-8 bg-gray-900">
        <div className="py-1">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-8 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acción
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((move, index) => (
                    <tr tabIndex={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm bg-gray-900">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {move.accion}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {move.descripcion}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {move.fecha}
                        </p>
                      </td>
                      <td className=" border-b border-gray-200 bg-white text-sm"></td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <button
                          type="button"
                          className="inline-block text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            className="inline-block h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                          </svg>
                        </button>
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

export default Moves;
