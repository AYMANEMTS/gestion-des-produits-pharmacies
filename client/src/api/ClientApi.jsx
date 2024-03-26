import {axiosClient} from "./axios";


export const ClientApi = {
    login: async (data) => {
        return await axiosClient.post('/api/client/login',data).catch((e) => console.log(e))
    },
    register: async (data) => {
        return await axiosClient.post('/api/client/create',data).catch((e) => console.log(e))
    },
    getProduts: async (page) => {
        return await axiosClient.get(`/api/produit?page=${page}`).catch((e) => console.log(e))
    },
    storeOrder: async (data) => {
        return await axiosClient.post('/api/client/order',data).catch((e) => console.log(e))
    },
    getClientorders: async () => {
        return await axiosClient.get('/api/client/order_user').catch((e) => console.log(e))
    },
    getOrder: async (id) => {
        return await axiosClient.get(`/api/client/order/${id}`).catch((e) => console.log(e))
    },
    getCategories: async () => {
        return await axiosClient.get("/api/category").catch((e) => console.log(e))
    },
}