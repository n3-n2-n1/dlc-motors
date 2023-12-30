// Importa las dependencias necesarias
import * as XLSX from "xlsx";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Upload = () => {
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBeUsRJLwVlC5dga3Xc2jnGcyq2ZYZEeY4",
    authDomain: "dlc-motors.firebaseapp.com",
    projectId: "dlc-motors",
    storageBucket: "dlc-motors.appspot.com",
    messagingSenderId: "100317160888",
    appId: "1:100317160888:web:9470cefb31157067131b4d",
    measurementId: "G-7J2BMCMDKZ",
  });

  const db = firebaseApp.firestore();

  // Ruta de la colección en Firestore
  const handleUpload = () => {
    const collectionRef = db
      .collection("products")
      .doc("allProducts")
      .collection("products");

    // Ruta al archivo Excel
    const excelFilePath = "./vbuscarproductos.xls";

    // Lee el archivo Excel
    const workbook = XLSX.readFile(excelFilePath);
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    ) as Array<any>;

    // Carga los datos en Firestore
    data.forEach((producto) => {
      collectionRef
        .add(producto)
        .then((docRef) => {
          console.log("Documento agregado con ID:", docRef.id);
        })
        .catch((error: string) => {
          console.error("Error al agregar documento:", error);
        });
    });
  };
  return (
    <div>
      <button onClick={handleUpload}>Cargar productos</button>
    </div>
  );
};

export default Upload;
