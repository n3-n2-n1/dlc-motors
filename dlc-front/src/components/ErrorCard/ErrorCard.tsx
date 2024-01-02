/** La funcion de error card es traerse los ultimos errores cargados y todos aquellos que existan en la base de datos
 *
 * --Como gestionan ellos esto no lo se, lo que si voy a hacer es dejar el template piola
 *
 * --Por otro lado tenemos el modelo escrito pero hay que consultar con ellos como quieren la rubrica
 */

function ErrorCard() {
  return (
    <div className="">

    <div className="w-full p-4 bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-200 text-gray-700 text-lg px-6 py-4">
          Fecha: 26/05/11 - 12:34:21
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <div className="bg-orange-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold">
            Ingreso
          </div>
          <div className="text-sm">Importacion</div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="border rounded-lg p-4 bg-gray-200">El producto fue devuelto por fallas tecnicas en el proceso de armado inicial.</div>
        </div>

        <div className="bg-gray-200 px-6 py-4">
          <div className="uppercase text-xs text-gray-600 font-bold">
            Detalles
          </div>

          <div className="flex items-center pt-3">
            <div className="bg-blue-700 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white"></div>
            <div className="ml-4">
              <p className="font-bold">Codigo: AC1012</p>
              <p className="text-sm text-gray-700 mt-1">Rubro: Motores</p>
              <p className="text-sm text-gray-700 mt-1">Origen Fábrica</p>
              <p className="text-sm text-gray-700 mt-1">Producto: Tensor Valvular</p>
              <p className="text-sm text-gray-700 mt-1">Descripcion: Tensor valvular hidraulico 15mm</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </div>

  );
}

export default ErrorCard;
