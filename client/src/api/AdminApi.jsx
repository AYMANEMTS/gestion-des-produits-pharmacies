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
    },
    getUsers: async () => {
        return await axiosClient.get('/api/admin/users').catch((e) => console.log(e))
    },
    createAdmin: async (data) => {
        return await axiosClient.post('/api/admin/create',data).catch((e) => console.log(e))
    },
    createPharmacien: async (data) => {
        return await axiosClient.post('/api/pharmacien/create',data).catch((e) => console.log(e))
    },
    updateClient: async (id,data) => {
        return await axiosClient.post(`/api/admin/client/${id}/update`,data).catch((e) => console.log(e))
    },
    updateAdmin: async (id,data) => {
        return await axiosClient.post(`/api/admin/update/${id}`,data).catch((e) => console.log(e))
    },
    getPharmacy: async () => {
        return await axiosClient.get('/api/pharmacy').catch((e) => console.log(e))
    },
    updatePharmacien: async (id,data) => {
        return await axiosClient.post(`/api/admin/update/pharmacien/${id}`,data).catch((e) => console.log(e))
    },
    deleteUser: async (id,type) => {
        const data = new FormData()
        data.append('user_type',type)
        return await axiosClient.post(`/api/admin/delete/user/${id}`,data,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).catch((e) => console.log(e))
    },
    createCategory: async (data) => {
        return await axiosClient.post('/api/category',data).catch((e) => console.log(e))
    },
    updateCategory: async (id,data) => {
        return await axiosClient.post(`/api/category/${id}/update`,data).catch((e) => console.log(e))
    },
    deleteCategory: async (id) => {
        return await axiosClient.delete(`/api/category/${id}`).catch((e) => console.log(e))
    },
    createFourniseur: async (data) => {
        return await axiosClient.post('/api/fourniseur',data).catch((e) => console.log(e))
    },
    updateFourniseur: async (id,data) => {
        return await axiosClient.post(`/api/fourniseur/${id}/update`,data).catch((e) => console.log(e))
    },
    deleteFourniseur: async (id) => {
        return await axiosClient.delete(`/api/fourniseur/${id}`).catch((e) => console.log(e))
    },
    updatePharmacy: async (id,data) => {
        return await axiosClient.post(`/api/pharmacy/${id}/update`,data).catch((e) => console.log(e))
    },
    deletePharmacy: async (id) => {
        return await axiosClient.delete(`/api/pharmacy/${id}`).catch((e) => console.log(e))
    },
    createPharmacy: async (data) => {
        return await axiosClient.post('/api/pharmacy/store',data).catch((e) => console.log(e))
    },
    getClientsOrders: async () => {
        return await axiosClient.get('/api/client/orders').catch((e) => console.log(e))
    },
    getPharmaciensOrders: async () => {
        return await axiosClient.get('/api/pharmacien/orders').catch((e) => console.log(e))
    },
    changeOrderStatus: async (id,data) => {
        return await axiosClient.post(`/api/admin/command/${id}/update/status`,data).catch((e) => console.log(e))
    },
    updateOrderDate: async (id,data) => {
        return await axiosClient.post(`/api/admin/update/order/${id}/date`,data).catch((e) => console.log(e))
    }
}