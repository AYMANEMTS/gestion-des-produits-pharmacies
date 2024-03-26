import {createContext, useContext, useEffect, useState} from 'react';
import secureLocalStorage from "react-secure-storage";

const StateStoreContext = createContext();

const INIT_PRODUCTS_DATA = secureLocalStorage.getItem('products')? secureLocalStorage.getItem('products') : [];

export default function StoreContext({ children }) {
    const [products, setProducts] = useState(INIT_PRODUCTS_DATA);
    const [usingCategories, setUsingCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        secureLocalStorage.setItem('products', products);
        secureLocalStorage.setItem('usingCategories', usingCategories);
    }, [products,usingCategories]);
    const calculDiscount = (promo,prix_vendre) => {
        return (prix_vendre - ((promo / 100) * prix_vendre)).toFixed(2)
    }
    return (
        <StateStoreContext.Provider value={{ products, setProducts , calculDiscount , setIsLoading , isLoading
        , setUsingCategories: setUsingCategories , usingCategories: usingCategories}}>
            {children}
        </StateStoreContext.Provider>
    );
}

export const useStoreContext = () => useContext(StateStoreContext);
