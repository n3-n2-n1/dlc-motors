import { User } from "../../Interfaces/User";
import { Errors } from "../../components/ErrorCard/ErrorCard";
import * as xlsx from "xlsx";
import { toast } from "react-toastify";

const URL = "http://localhost:3000";

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
    console.log(returnsData.payload);
    return returnsData;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
// const fetchErrors = async () => {
//   try {
//     const response = await fetch(`${URL}/api/v1/productErrors`);

//     if (!response.ok) {
//       throw new Error("Error status");
//     }

//     const errorData = await response.json();
//     console.log(errorData);
//     return return await response.json();
//   } catch (error) {
//     console.error("error", error);
//     throw error;
//   }
// };

const fetchReturns = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/returns`);

    if (!response.ok) {
      throw new Error("Error status");
    }

    const returnsData = await response.json();
    console.log(returnsData.payload);
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
    console.log("User created successfully:", responseData);
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
    console.log(responseData);
    console.log("Product created successfully:", responseData);
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
    console.log("Product created successfully:", responseData);
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
    console.log(responseData);
    console.log("Devolucion created successfully:", responseData);
  } catch (error) {
    console.log(error);
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
    console.log("Movimientosss created successfully:", responseData);
  } catch (error) {
    console.error("Error creating product:");
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
    console.log("Delivery created successfully:", responseData);
  } catch (error) {
    console.error("Error creating product:");
    console.log(deliveryData);
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
    console.log("Product edited successfully:", responseData);
  } catch (error) {
    console.error("Error editing product:", error);
  }
};


const updateError = async (errorUpdates: any) => {
  try {
    const response = await fetch(
      `${URL}/api/v1/productErrors/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorUpdates),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const responseData = await response.json();
    console.log("Error target edited successfully:", responseData);
  } catch (error) {
    console.error("Error editing errors data:", error);
  }
}

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
    console.log("Product deleted successfully:", responseData);
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
    console.log("Edited user successfully:", updatedUser);
  } catch (error) {
    console.error(`Error editing user ${error}`);
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


const createMultipleProducts = async (data: any) => {
  try {
    console.log('iiiiiiiiiiiii', data)
    const response = await fetch(`${URL}/api/v1/products/createMultiple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log('Productos cargados exitosamente');
  } catch (error) {
    console.error('Error al enviar datos al servidor', error);
  }
};


export {
  fetchUser,
  fetchErrors,
  createError,
  updateError,
  fetchProducts,
  createProduct,
  modifyProduct,
  deleteProducts,
  createUser,
  createReturns,
  fetchMoves,
  handleAddMassive,
  createMovement,
  createDelivery,
  editUser,
  fetchReturns,
  fetchDelivery,
  fetchCosts,
  fetchBrands,
  fetchErrorObservations,
  fetchOutcomeObservations,
  fetchReturnObservations,
  fetchIncomeObservations,
  createMultipleProducts
};
