// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import {getStorage , ref , uploadBytes ,getDownloadURL} from 'firebase/storage'
import{v4} from 'uuid'
// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyBEc2ILEygMxTaAyHDyFuvtTUbEOyaSDMM",
    authDomain: "medicine-app-role.firebaseapp.com",
    projectId: "medicine-app-role",
    storageBucket: "gs://medicine-app-role.appspot.com",
    messagingSenderId: "868110344968",
    appId: "1:868110344968:web:0c5ec03fa043f61ce6c2bd",
};



// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
 export const storage = getStorage(firebaseApp)

 export async function uploadFile (file){
    const storageRef = ref(storage , v4()) 
    await uploadBytes(storageRef , file)
    const url = await getDownloadURL(storageRef)
    return url
 }
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;

