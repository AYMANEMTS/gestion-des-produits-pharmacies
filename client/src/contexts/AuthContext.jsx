import {createContext, useContext, useState} from "react";
import {axiosClient} from "../api/axios.js";

export const StateUserContext = createContext({
    user:{},
    setUser:() => {},
    login: () => {},
    logout: () => {},
    token: null,
    setToken: () => {}

})
export default function UserContext({children}) {
    const storedUserData = localStorage.getItem('userData');
    const initialUser = storedUserData ? JSON.parse(storedUserData) : null
    const [user, setUser] = useState(initialUser)
    const storedToken = localStorage.getItem('token');
    const initialToken = storedToken ? storedToken : null
    const [token, setToken] = useState(initialToken)
    const login = async (email,password,url) => {
        return await axiosClient.post(url,{email,password})
    }
    return (
        <>
            <StateUserContext.Provider value={{
                user,
                setUser,
                login,
                token,
                setToken
            }}  >
                {children}
            </StateUserContext.Provider>
        </>
    );
}
export const useUserContext = () =>  useContext(StateUserContext)