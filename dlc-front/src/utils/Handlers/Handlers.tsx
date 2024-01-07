import { User } from "../../Interfaces/User";
import { Errors } from "../../Interfaces/Errors";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";

const fetchUser = async (): Promise<User[]> => {
  try {
    const response = await fetch("http://localhost:3000/usuarios");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData: User[] = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const createUser = async (userData: any) => {

  try {
    const response = await fetch("http://localhost:3000/usuarios/registro", {
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
    console.log("Product created successfully:", responseData);
    <Link to={paths.products}/>
  } catch (error) {
    console.error("Error creating product:");
  }
};

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/productos"); // Reemplaza con la ruta correcta
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Puedes manejar el error aquí o dejar que el componente principal lo maneje
  }
};

const createProduct = async (productData: any) => {
  try {
    const response = await fetch("http://localhost:3000/productos", {
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

const fetchErrors = async (): Promise<Errors[]> => {
  try {
    const response = await fetch("http://localhost:3000/getErrorProduct");

    if (!response.ok) {
      throw new Error("Error status");
    }

    const errorData: Errors[] = await response.json();
    return errorData;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const createError = async (errorData: any) => {
  try {
    const response = await fetch("http://localhost:3000/productos", {
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
    console.error("Error creating product:");
  }
};



const LoginUser = async (values: any) => {
  const url = "http://localhost:3000/usuarios/login";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    return response; // Devuelve la respuesta para que pueda ser manejada en el código que llama a LoginUser
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error; // Re-lanza el error para que pueda ser manejado en el código que llama a LoginUser
  }

};
export {
  fetchUser,
  fetchErrors,
  createError,
  fetchProducts,
  createProduct,
  createUser,
  LoginUser
};
