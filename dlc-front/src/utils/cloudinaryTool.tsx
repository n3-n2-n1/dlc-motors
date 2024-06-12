import CryptoJS from "crypto-js";
import dotenv from 'dotenv';

export async function uploadImageToCloudinary(file) {
  if (!file) {
    throw new Error('No se proporcionó un archivo.');
  }

  const apiKey = import.meta.env.CLOUDINARY_API_KEY;
  const uploadPreset = "ml_default"; // Reemplaza con tu upload preset
  const cloudName = "dripemmbb"; // Reemplaza con tu nombre de Cloudinary

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset); // Asegúrate de que el preset esté presente
  formData.append('api_key', apiKey);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falló la carga de la imagen: ${errorText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error al cargar la imagen:', error.message);
    throw error;
  }
}
