
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { collection, getDocs, getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA5j13lzM7B8eAlHM-DAfB7m2OP-2m8J4E",
  authDomain: "olx-clone-react-f68fb.firebaseapp.com",
  projectId: "olx-clone-react-f68fb",
  storageBucket: "olx-clone-react-f68fb.firebasestorage.app",
  messagingSenderId: "728301225097",
  appId: "1:728301225097:web:912355048d395313bf7258"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();
const fireStore = getFirestore();


const fetchFromFirestore = async () => {
    try {
        const productsCollection = collection(fireStore,'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map( doc => ({
            id : doc.id,
            ...doc.data()
        }))
        console.log('Data fetched from firebase ',productList)
        return productList;
    } catch (error) {
        console.log('Error while fetching data from firebase ',error);
        return [];
    }
}

export {
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFirestore
}