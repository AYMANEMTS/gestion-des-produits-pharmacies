import {createContext, useContext, useEffect, useState} from "react";
import secureLocalStorage from "react-secure-storage";

const AdminContextProvider = createContext()

export default function AdminContext({children}){
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [fourniseurs, setFourniseurs] = useState([])
    const [pharmacy, setPharmacy] = useState([])
    const [paginationData, setPaginationData] = useState({
        page: 1,
        totalPages: null
    })
    useEffect(() => {
        secureLocalStorage.setItem('products',products)
        secureLocalStorage.setItem('categories',categories)
        secureLocalStorage.setItem('fourniseurs',fourniseurs)
        secureLocalStorage.setItem('paginationData',paginationData)
        secureLocalStorage.setItem('pharmacy',pharmacy)
    }, [products,categories,fourniseurs,paginationData]);

    return (
        <AdminContextProvider.Provider value={{
            products, setProducts , categories, setCategories ,fourniseurs, setFourniseurs,
            paginationData, setPaginationData, pharmacy, setPharmacy
        }}>
            {children}
        </AdminContextProvider.Provider>
    )
}
export const useAdminContext = () => useContext(AdminContextProvider)