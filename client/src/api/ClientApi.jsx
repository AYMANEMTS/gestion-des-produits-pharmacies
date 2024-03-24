import {axiosClient} from "./axios";


export const ClientApi = {
    login: async (data) => {
        return await axiosClient.post('/api/client/login',data)
    },
    getProduts: async () => {
        return await axiosClient.get('/api/produit?page=1')
    },
    storeOrder: async (data) => {
        return await axiosClient.post('/api/client/order',data)
    },
    getClientorders: async () => {
        return await axiosClient.get('/api/client/order_user')
    },
    getOrder: async (id) => {
        return await axiosClient.get(`/api/client/order/${id}`)
    },
    getCategories: async () => {
        return await axiosClient.get("/api/category")
    }
}