export const paths = {
  login: "/login",
  register: "/registro",
  users: "/usuarios",

  home: "/",
  products: "/productos",
  addProduct: "/productos/agregar",
  editProduct: "/productos/editar",
  categories: "/rubros",

  costs: "/costos",
  returns: "/devoluciones", // Se registran devoluciones, tanto buenas como rotas'. Con su respectivo historial de movimiento
  errors: "/errores", // Se informan las diferencias de stock entre el real y el sistema. Con su respectivo historial de movimiento
  
  upload:"/ingresos", //Cargar ingreso
  inventory:"/inventario", //Cargar inventario
  outcomes:"/egresos", //Cargar egreso
  moves: "/movimientos", // Listado de todos los movimientos realizados en el sistema, tanto de ingresos como de egresos, devoluciones y errores
  delivery: "/pedidos",
  
  notifications:"/notificaciones",
  // notifications: "/notificaciones", // Acá figurarían las notificaciones de stock bajo, stock crítico, reposición de stock, etc.
  // management: "/gestion",
  historyView:"/historyView",
  fatal:"*",
  massive: "/massiveAdd",
  massiveDelivery: "/massiveDelivery",
};
