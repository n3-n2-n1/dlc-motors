import { User } from "../../Interfaces/User";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL; // Así es como se accede en Vite.

const token = localStorage.getItem("userJWT");

//---------------------------------------------------------------//
//---------------------------------------------------------------//
//----------------------READING HANDLERS-------------------------//
//---------------------------------------------------------------// 
//---------------------------------------------------------------//

const fetchUser = async (token: string): Promise<User[]> => {
  try {
    const response = await fetch(`${URL}/api/v1/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData: User[] = await response.json();
    return (userData as any).payload;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const fetchProducts = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.payload;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const fetchErrors = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/productErrors`);

    if (!response.ok) {
      throw new Error("Error status");
    }

    const returnsData = await response.json();
    return returnsData;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const fetchReturns = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/returns`);

    if (!response.ok) {
      throw new Error("Error status");
    }

    const returnsData = await response.json();
    return returnsData;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const fetchMoves = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/movements`);
    if (!response.ok) {
      throw new Error("Error al obtener el historial de acciones");
    }
    const responseData = await response.json(); // Retorna los datos
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado donde sea que llames a esta función
  }
};

const fetchDelivery = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/delivery`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching historial:", error);
    throw error;
  }
};

const fetchCosts = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/costs`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching historial:", error);
    throw error;
  }
};

//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------CREATION HANDLERS-------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const createUser = async (userData: string) => {
  try {
    const response = await fetch(`${URL}/api/v1/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const userData = await response.json();
      throw new Error(userData.error);
    }

    const responseData = await response.json();
    toast.success("creado");
    location.reload();
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const createProduct = async (productData: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const productData = await response.json();
      throw new Error(productData.error);
    }

    const responseData = await response.json();
    toast.success("Product created sucessfully");
  } catch (error) {
    console.error("Error creating product:");
  }
};

const handleAddMassive = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0]; // Verifica si target y files están definidos
  if (!file) {
    console.error("No se seleccionó ningún archivo.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = e.target?.result; // Verifica si target está definido
    if (!data) {
      console.error("No se pudo leer el archivo.");
      return;
    }

    const workbook = xlsx.read(data, { type: "binary" });

    // Procesa los datos del archivo Excel aquí
    // Puedes enviarlos al servidor mediante una solicitud HTTP
  };

  reader.readAsBinaryString(file);
};

const createError = async (errorData: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/productErrors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

const createReturns = async (returnData: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/returns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(returnData),
    });

    if (!response.ok) {
      const returnData = await response.json();
      throw new Error(returnData.error);
    }

    const responseData = await response.json();
    toast.success("Devolucion creada correctamente");
  } catch (error) {
    throw new Error();
  }
};

const createMovement = async (movementData: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/movements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movementData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
    toast.success("Movimiento de ingreso/egreso creado correctamente");
  } catch (error) {
    console.error("Error creating income / outcome movement:");
  }
};

const createInventoryMovement = async (movementData: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/movements/inventario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movementData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
    toast.success("Movimiento de inventario creado correctamente");
  } catch (error) {
    console.error("Error creating inventory movement");
  }
};

const createDelivery = async (deliveryData: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/delivery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryData),
    });

    if (!response.ok) {
      const deliveryData = await response.json();
      throw new Error(deliveryData.error);
    }

    const responseData = await response.json();
    toast.success("Pedido creado correctamente");
  } catch (error) {
    console.error("Error creating product:");
  }
};

const createCosts = async (costData) => {
  // Proporcionar valores por defecto para los campos faltantes
  const defaultCostData = {
    descripcion: costData.descripcion || '',
    codigo: costData.codigo || '',
    marca: costData.marca || '',
    stock: costData.stock || 0,
    proveedores: costData.proveedores || [],
    rubro: costData.rubro || '',
    sku: costData.sku || ''
  };

  try {
    const response = await fetch(`${URL}/api/v1/costs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defaultCostData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
    toast.success("Costo creado correctamente");
  } catch (error) {
    console.error("Error creating product:", error);
    toast.error("Error al crear el costo");
  }
};

//---------------------------------------------------------------//
//---------------------------------------------------------------//
//-------------------------EDIT HANDLERS-------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const modifyProduct = async (productToEdit: any) => {
  try {
    const response = await fetch(
      `${URL}/api/v1/products/${productToEdit.codigoInt}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToEdit),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
  } catch (error) {
    console.error("Error editing product:", error);
  }
};

const modifyCosts = async (newCosts: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/costs/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCosts),
    });

    if (!response.ok) {
      const costData = await response.json();
      throw new Error(costData.error);
    }

    toast.success("Modificacion de costo exitosa");
  } catch (error) {
    console.error("Error editing product:", error);
  }
};

const updateError = async (errorUpdates: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/productErrors/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorUpdates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
    toast.success("Error modificado correctamente");
  } catch (error) {
    console.error("Error editing errors data:", error);
  }
};

const updateDelivery = async (deliveryUpdates: any) => {
  try {
    const user = await checkUser();

    const parsedDeliveryUpdates = {
      usuario: user.name,
      date: new Date().toLocaleString(),
      observaciones: "Importación",
      tipoMov: "Ingreso",
      codigoInt: deliveryUpdates.codigoInt,
      codOEM: deliveryUpdates.codOEM,
      desc: deliveryUpdates.desc,
      detalle: deliveryUpdates.numImpo,
      estado: deliveryUpdates.estado,
      stock: deliveryUpdates.stockDeposito,
      cantidad: deliveryUpdates.cantidad,
      stockAct: deliveryUpdates.stockAcumulado,
    };

    // Crear un objeto solo con el estado y el numImpo para hacer el fetch al update
    const deliveryStatusUpdates = {
      estado: deliveryUpdates.estado,
      numImpo: deliveryUpdates.numImpo,
      cantidad: deliveryUpdates.cantidad,
      codigoInt: deliveryUpdates.codigoInt,
    };

    const response = await fetch(`${URL}/api/v1/delivery/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryStatusUpdates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    if (deliveryUpdates.estado === "Entregado") {
      createMovement(parsedDeliveryUpdates);
    }

    // const responseData = await response.json();
    toast.success("Delivery modificado correctamente");
  } catch (error) {
    console.error("Error editing delivery:", error);
  }
};

//---------------------------------------------------------------//
//---------------------------------------------------------------//
//---------------------DELETION HANDLERS-------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const deleteProducts = async (productData: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/products/${productData}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
    toast.success("Producto eliminado correctamente");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

//---------------------------------------------------------------//
//---------------------------------------------------------------//
//-----------------------USERS HANDLERS--------------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const editUser = async (userToUpdate: any) => {
  try {
    const response = await fetch(
      `${URL}/api/v1/users/${userToUpdate.username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToUpdate),
      }
    );

    const updatedUser = await response.json();
    toast.success("Usuario editado correctamente");
  } catch (error) {
    console.error(`Error editing user ${error}`);
  }
};

const deleteUser = async (username: string) => {
  try {
    const response = await fetch(`${URL}/api/v1/users/${username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting user");
    }

    toast.success("Usuario eliminado correctamente");
  } catch (error) {
    console.error(`Error deleting user ${error}`);
  }
};

const checkUser = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/users/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error checking user");
    }

    const userData = await response.json();
    return userData.payload;
  } catch (error) {
    console.error(`Error checking user ${error}`);
  }
};

//---------------------------------------------------------------//
//---------------------------------------------------------------//
//-------------OBSERVATIONS/BRANDS HANDLERS----------------------//
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const fetchBrands = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/observations/brands`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return (data as any).payload[0];
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

const fetchErrorObservations = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/observations/errors`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return (data as any).payload[0];
  } catch (error) {
    console.error("Error fetching Errors Observations:", error);
    throw error;
  }
};

const fetchOutcomeObservations = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/observations/outcomes`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return (data as any).payload[0];
  } catch (error) {
    console.error("Error fetching Outcomes Observations:", error);
    throw error;
  }
};

const fetchReturnObservations = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/observations/returns`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return (data as any).payload[0];
  } catch (error) {
    console.error("Error fetching Returns Observations:", error);
    throw error;
  }
};

const fetchIncomeObservations = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/observations/incomes`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return (data as any).payload[0];
  } catch (error) {
    console.error("Error fetching Incomes Observations:", error);
    throw error;
  }
};

const updateObservations = async (data: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/observations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.success("Observaciones actualizadas correctamente");
  } catch (error) {
    console.error("Error al enviar datos al servidor", error);
    toast.error("Error al actualizar las observaciones");
  }
};

const updateBrands = async (data: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/observations/brands`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.success("Marcas actualizadas correctamente");
  } catch (error) {
    console.error("Error al enviar datos al servidor", error);
    toast.error("Error al actualizar las marcas");
  }
};

const updateCategories = async (data: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.success("Categorias actualizadas correctamente");
  } catch (error) {
    console.error("Error al enviar datos al servidor", error);
    toast.error("Error al actualizar las categorias");
  }
};

const getCategories = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return (data as any).payload[0];
  } catch (error) {
    console.error("Error al enviar datos al servidor", error);
  }
};

const createMultipleProducts = async (data: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/products/createMultiple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al enviar datos al servidor", error);
  }
};

const createMultipleDelivery = async (data: any) => {
  try {
    const response = await fetch(`${URL}/api/v1/delivery/createMultiple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error`);
    }
  } catch (error) {
    console.error("Error al enviar los datos al servidor", error);
  }
};


export {
  fetchUser,
  fetchErrors,
  createError,
  updateError,
  updateDelivery,
  fetchProducts,
  createProduct,
  modifyProduct,
  deleteProducts,
  createUser,
  createReturns,
  fetchMoves,
  handleAddMassive,
  createMovement,
  createInventoryMovement,
  createDelivery,
  editUser,
  deleteUser,
  fetchReturns,
  fetchDelivery,
  fetchCosts,
  fetchBrands,
  fetchErrorObservations,
  fetchOutcomeObservations,
  fetchReturnObservations,
  fetchIncomeObservations,
  updateObservations,
  createMultipleProducts,
  createMultipleDelivery,
  modifyCosts,
  createCosts,
  updateBrands,
  updateCategories,
  getCategories,
};
