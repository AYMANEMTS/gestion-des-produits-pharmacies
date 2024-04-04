import {createContext, useContext, useEffect, useState} from "react";
import secureLocalStorage from "react-secure-storage";

export const StateUserContext = createContext({})
export default function UserContext({children}) {
    const storedUserData = secureLocalStorage.getItem('userData');
    const initialUser = storedUserData ? storedUserData : null
    const [user, setUser] = useState(initialUser)

    const storedToken = secureLocalStorage.getItem('token');
    const initialToken = storedToken ? storedToken : null
    const [token, setToken] = useState(initialToken)

    const storedUsertype = secureLocalStorage.getItem('userType');
    const initialUsertype = storedUsertype ? storedUsertype : null
    const [userType, setUserType] = useState(initialUsertype)

    useEffect(() => {
        if (user) secureLocalStorage.setItem('userData',user)
        if (token) secureLocalStorage.setItem('token',token)
        if (userType) secureLocalStorage.setItem('userType',userType)
    }, [token, user, userType]);

    const logout = () => {
        setToken(null);
        setUser(null);
        setUserType(null);
        secureLocalStorage.removeItem('token')
        secureLocalStorage.removeItem('userData')
        secureLocalStorage.removeItem('userType')
    }
    return (
        <>
            <StateUserContext.Provider value={{
                user,
                setUser,
                token,
                setToken,
                logout, setUserType , userType
            }}  >
                {children}
            </StateUserContext.Provider>
        </>
    );
}
export const useUserContext = () =>  useContext(StateUserContext)