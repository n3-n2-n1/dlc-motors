import { toast } from "react-toastify"
import { fetchCosts, fetchDelivery, fetchErrors, fetchMoves, fetchProducts, fetchReturns } from "../../utils/Handlers/Handlers"


const ReloadTable = ({name}) => {
    try {
        
    if(name === 'Costos'){
        return fetchCosts()
    }
    else if(name === 'Errores'){
        return fetchErrors()

    }
    else if (name === 'Productos'){
        return fetchCosts()
    }
    else if (name === 'Devoluciones'){
        return fetchReturns()
    }
    else if (name === 'Notificaciones'){
        return(console.log('No anda esto.'))
    }
    else if (name === 'Ingresos' || 'Inventario' || 'Egresos'){
        return fetchMoves()
    }
    else if (name === 'Pedidos'){
        return fetchDelivery()
    }
    } catch (error) {
        toast.error('Error al recargar los datos para ${name}.')
    }


    return(
        <div>
            soy un loader
        </div>
    )
}


export default ReloadTable