import {createContext, useContext, useEffect, useState} from 'react';

const StateStoreContext = createContext();

const INIT_PRODUCTS_DATA = localStorage.getItem('products')?JSON.parse(localStorage.getItem('products')) : [];

export default function StoreContext({ children }) {
    const [products, setProducts] = useState(INIT_PRODUCTS_DATA);
    const [usingCategories, setUsingCategories] = useState([])
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('usingCategories', JSON.stringify(usingCategories));
    }, [products,usingCategories]);
    const calculDiscount = (promo,prix_vendre) => {
        return (prix_vendre - ((promo / 100) * prix_vendre)).toFixed(2)
    }
    return (
        <StateStoreContext.Provider value={{ products, setProducts , calculDiscount
        , setUsingCategories: setUsingCategories , usingCategories: usingCategories}}>
            {children}
        </StateStoreContext.Provider>
    );
}

export const useStoreContext = () => useContext(StateStoreContext);
