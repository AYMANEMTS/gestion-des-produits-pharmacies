import {axiosClient} from "./axios";


export const ClientApi = {
    login: async (data) => {
        return await axiosClient.post('/api/client/login',data)
    },
    getProduts: async () => {
        return await axiosClient.get('/api/produit?page=1')
    }
}