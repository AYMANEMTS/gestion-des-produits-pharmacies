import {createContext, useContext, useEffect, useState} from 'react';

const StateStoreContext = createContext();

const INIT_PRODUCTS_DATA = localStorage.getItem('products')?JSON.parse(localStorage.getItem('products')) : [];

export default function StoreContext({ children }) {
    const [products, setProducts] = useState(INIT_PRODUCTS_DATA);
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <StateStoreContext.Provider value={{ products, setProducts }}>
            {children}
        </StateStoreContext.Provider>
    );
}

export const useStoreContext = () => useContext(StateStoreContext);
