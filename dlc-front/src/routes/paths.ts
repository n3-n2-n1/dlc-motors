export const paths = {
  login: "/login",
  register: "/registro",
  home: "/",
  products: "/productos",
  costs: "/costos",
  categories: "/rubros",
  management: "/gestion", 
  returns: "/devoluciones", // Se registran devoluciones, tanto buenas como rotas'
  errors: "/errores", // Se informan las diferencias de stock entre el real y el sistema. ¿Esto luego se corregiría desde '/inventario'?
  errors_history: "/errores/historial", // Listado de los movimientos realizados en '/errores'
  moves: "/movimientos", // Listado de todos los movimientos realizados en el sistema, tanto de ingresos como de egresos, devoluciones y errores
  users: "/usuarios",
  notifications: "/notificaciones", // Acá figurarían las notificaciones de stock bajo, stock crítico, reposición de stock, etc.
  ranking: "/ranking", // Listado de los productos más vendidos en un periodo de tiempo, y cuantos se devolvieron por roto/fallado
  upload:"/upload",
  
};
