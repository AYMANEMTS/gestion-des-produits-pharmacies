import {createContext, useContext, useEffect, useState} from "react";
import secureLocalStorage from "react-secure-storage";


const ShopingCartContext = createContext({})
const INITIAL_CART_ITEMS = secureLocalStorage.getItem("shopping-cart")?secureLocalStorage.getItem("shopping-cart"):[]
const ShopingCartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS)
    useEffect(() => {
        secureLocalStorage.setItem("shopping-cart",cartItems)
    }, [cartItems]);
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

    const getTotalPrice = (products) => {
        return cartItems.reduce((total, cartItem) => {
            const item = products.find((product) => product.id === cartItem.id);
            if (item) {
                const itemPrice = item.promotion ? (item.prix_vendre - (item.prix_vendre * (item.promotion.pourcentage / 100))) : item.prix_vendre;
                return total + (itemPrice * cartItem.qty);
            }
            return total;
        }, 0);
    };


    return <ShopingCartContext.Provider value={{cartItems, getItemQty , increaseCartQty , decreaseCartQty ,
        removeItemFromCart , getCountItemsCart , getTotalPrice , clearShoppingCart}}>
        {children}
    </ShopingCartContext.Provider>
}
export default ShopingCartProvider;

export const useShopingCart = () => useContext(ShopingCartContext)
