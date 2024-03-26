import {axiosClient} from "./axios";

export const AdminApi = {
    login: async (data) => {
        return await axiosClient.post('/api/admin/login',data).catch((e) => console.log(e))
    },
    getFourniseurs: async () => {
        return await axiosClient.get('/api/fourniseur').catch((e) => console.log(e))
    },
    productStore: async (data) => {
        return await axiosClient.post('/api/produit',data).catch((e) => console.log(e))
    },
    productUpdate: async (id,data) => {
        return await axiosClient.post(`/api/produit/${id}/update`,data).catch((e) => console.log(e))
    },
    destroyProduct: async (id) => {
        return await axiosClient.delete(`/api/produit/${id}`).catch((e) => console.log(e))
    }
}