import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShopingCartContext = createContext({});

const ShopingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem("shopping-cart");
                const storedProducts = await AsyncStorage.getItem("products");
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
                if (storedProducts) {
                    setProducts(JSON.parse(storedProducts));
                }
            } catch (error) {
                console.error("Error loading cart items:", error);
            }
        };
        loadCartItems();
    }, []);

    useEffect(() => {
        const saveCartItems = async () => {
            try {
                await AsyncStorage.setItem("shopping-cart", JSON.stringify(cartItems));
                await AsyncStorage.setItem("products", JSON.stringify(products));
            } catch (error) {
                console.error("Error saving cart items:", error);
            }
        };
        saveCartItems();
    }, [cartItems,products]);


    const getItemQty = (id) => {
        return cartItems.find((item) => item.id === id)?.qty || 0
    }
    const increaseCartQty = (id) => {
        setCartItems((currentItems) => {
            if(currentItems.find(item => item.id === id)==null){
                return [...cartItems, {id,qty: 1}]
            }else {
                return currentItems.map((item) => {
                    if (item.id === id){
                        return {...item,qty:item.qty +1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
    const decreaseCartQty = (id) => {
        setCartItems((currentItems) => {
            const updatedItems = currentItems.map((item) => {
                if (item.id === id) {
                    return { ...item, qty: item.qty - 1 };
                }
                return item;
            });
            const itemToRemove = updatedItems.find((item) => item.id === id && item.qty === 0);
            if (itemToRemove) {
                return updatedItems.filter((item) => item.id !== id);
            }
            return updatedItems;
        });
    };

    const removeItemFromCart = (id) => {
        setCartItems((currentItems) => currentItems.filter((item) => item.id !== id)
        )
    }
    const getCountItemsCart = (Items) => {
        return Items.length
    }
    const clearShoppingCart = () => setCartItems([])

    const getTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
            const item = products.find((product) => product.id === cartItem.id);
            if (item) {
                return total + (item.prix_finale * cartItem.qty);
            }
            return total;
        }, 0).toFixed(2)
    };


    return <ShopingCartContext.Provider value={{cartItems, getItemQty , increaseCartQty , decreaseCartQty ,
        removeItemFromCart , getCountItemsCart , getTotalPrice , clearShoppingCart, products, setProducts}}>
        {children}
    </ShopingCartContext.Provider>
}
export default ShopingCartProvider;

export const useShopingCart = () => useContext(ShopingCartContext)