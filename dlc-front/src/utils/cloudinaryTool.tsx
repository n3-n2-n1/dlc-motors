import CryptoJS from 'crypto-js';

async function generateSignature(apiSecret, timestamp, uploadPreset) {
  const signaturePayload = `timestamp=${timestamp}&upload_preset=${uploadPreset}`;
  return CryptoJS.SHA1(signaturePayload + apiSecret).toString(CryptoJS.enc.Hex);
}

async function getCloudinaryConfig() {
  return {
    apiKey: import.meta.env.CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.CLOUDINARY_API_SECRET,
    uploadPreset: "ml_default",
  };
}

async function createFormData(file, timestamp, apiKey, uploadPreset, signature) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', apiKey);
  formData.append('upload_preset', uploadPreset);
  formData.append('signature', signature);
  return formData;
}

export async function uploadImageToCloudinary(file) {
  if (!file) {
    throw new Error('No se proporcionó un archivo.');
  }

  const { apiKey, apiSecret, uploadPreset } = await getCloudinaryConfig();
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = await generateSignature(apiSecret, timestamp, uploadPreset);
  const formData = await createFormData(file, timestamp, apiKey, uploadPreset, signature);

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dripemmbb/image/upload', {
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
