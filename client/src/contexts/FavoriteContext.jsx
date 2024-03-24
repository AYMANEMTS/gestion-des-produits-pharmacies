import {createContext, useContext, useEffect, useState} from "react";


const FavoriteContext = createContext({})
const INITIAL_FAVORITE_ITEMS = localStorage.getItem("favorites")?JSON.parse(localStorage.getItem("favorites")):[]

const FavoriteProvider = ({children}) => {
    const [favoriteItems, setFavoriteItems] = useState(INITIAL_FAVORITE_ITEMS)
    useEffect(() => {
        localStorage.setItem("favorites",JSON.stringify(favoriteItems))
    }, [favoriteItems]);
    const toogleFavorite = (product) => {
        setFavoriteItems((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some((item) => item.product.id === product.id);
            if (isAlreadyFavorite) {
                return prevFavorites.filter((item) => item.product.id !== product.id);
            } else {
                return [...prevFavorites, { product }];
            }
        });
    };
    const isFavorit = (id) => {
        return favoriteItems.some((item) => item.product.id === id);
    }
    const getCountFavorites = () => favoriteItems.length;

    return (
        <FavoriteContext.Provider value={{favoriteItems , isFavorit , setFavoriteItems , toogleFavorite ,getCountFavorites}}>
            {children}
        </FavoriteContext.Provider>
    )
}
export default FavoriteProvider
export const useFavoriteContext = () => useContext(FavoriteContext)
