import {createContext, useContext, useEffect, useState} from "react";
import secureLocalStorage from "react-secure-storage";

export const StateUserContext = createContext({
    user:{},
    setUser:() => {},
    logout: () => {},
    token: null,
    setToken: () => {}

})
export default function UserContext({children}) {
    const storedUserData = secureLocalStorage.getItem('userData');
    const initialUser = storedUserData ? storedUserData : null
    const [user, setUser] = useState(initialUser)
    const storedToken = secureLocalStorage.getItem('token');
    const initialToken = storedToken ? storedToken : null
    const [token, setToken] = useState(initialToken)
    useEffect((key, value) => {
        if (user){
            secureLocalStorage.setItem('userData',user)
        }
    }, [user]);

    const logout = () => {
        setToken(null)
        secureLocalStorage.removeItem('token')
        secureLocalStorage.removeItem('userData')
    }
    return (
        <>
            <StateUserContext.Provider value={{
                user,
                setUser,
                token,
                setToken,
                logout
            }}  >
                {children}
            </StateUserContext.Provider>
        </>
    );
}
export const useUserContext = () =>  useContext(StateUserContext)