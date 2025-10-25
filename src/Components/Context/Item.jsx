import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";

const Context = createContext(null);
export const ItemContext = () => useContext(Context);

export const ItemsContextProvider = ({children}) => {
    const [items,setItems] = useState(null);

    useEffect (() => {
        const fetchItemsFromFirestore = async () => {
            try {
                const productsCollection = collection(fireStore,'products');
                const productSnapshot = await getDocs(productsCollection);
                const productList = productSnapshot.docs.map(doc => ({
                    id : doc.id,
                    ...doc.data()
                }))
                setItems(productList);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItemsFromFirestore();

    },[]);

    return (
        <>
            <Context.Provider value={{items , setItems}}>
                {children}
            </Context.Provider>
        </>
    )

}