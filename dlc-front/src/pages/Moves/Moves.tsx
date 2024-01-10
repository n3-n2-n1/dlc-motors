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
        setHistorial(historialData);
      } catch (error) {
        // Handle the error here if needed
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 bg-gray-100 bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-auto text-sm p-6">
              <div className="flex-row">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            Historial de Movimientos
          </h1>
          <h2 className="text-gray-500 mb-4">
            Visualizá sobre movimientos generales <br />
          </h2>
		  </div>
	  <div className="container h-full mx-auto px-4 sm:px-8 bg-gray-900">
        <div className="py-1">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal bg-gray-900">
                <thead>
                  <tr>
                    <th className="px-8 py-3 border-b-2 border-gray-200 bg-gray-600 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-600 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-600 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Accion
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-600 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"></th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((move, index) => (
                    <tr tabIndex={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-gray-600 text-sm bg-gray-900">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-gray-200 whitespace-no-wrap">
                              {move.date}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-gray-600 text-gray-200 text-sm">
                        <p className="text-gray-200 whitespace-no-wrap">
                          {move.observaciones}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-gray-600 text-gray-100 text-sm">
                        <p className="text-gray-200 whitespace-no-wrap">
                        {move.movementType ? move.observaciones : move.descripcion}
                        </p>
                      </td>
                      <td className=" border-b border-gray-200 bg-gray-600 text-sm text-gray-100">
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-gray-600 text-gray-200 text-sm text-right">
                        <button
                          type="button"
                          className="inline-block text-gray-100 hover:text-gray-200"
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
