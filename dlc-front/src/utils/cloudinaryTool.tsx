import CryptoJS from 'crypto-js';

export async function uploadImageToCloudinary(file) {
  if (!file) {
    throw new Error('No se proporcionó un archivo.');
  }

  const apiKey = "631333633776132"
  const uploadPreset = "ml_default"
  const apiSecret = "LwNXTpuf7tCCEen1zoAvYwci6H4"

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signaturePayload = `timestamp=${timestamp}&upload_preset=${uploadPreset}`;
  const signature = CryptoJS.SHA1(signaturePayload + apiSecret).toString(CryptoJS.enc.Hex);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', apiKey);
  formData.append('upload_preset', uploadPreset);
  formData.append('signature', signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dv1tzyaki/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Falló la carga de la imagen');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    throw error;
  }
}
