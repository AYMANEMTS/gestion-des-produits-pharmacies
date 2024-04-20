import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const FavoriteContext = createContext({})

const FavoriteProvider = ({children}) => {
    const [favoriteItems, setFavoriteItems] = useState([])
    useEffect(() => {
        const loadfavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem("favorites-items");
                if (storedFavorites) {
                    setFavoriteItems(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error("Error favorites items:", error);
            }
        };
        loadfavorites();
    }, []);

    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem("favorites-items", JSON.stringify(favoriteItems));
            } catch (error) {
                console.error("Error favorites items:", error);
            }
        };
        saveFavorites();
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