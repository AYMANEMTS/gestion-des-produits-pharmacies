import {axiosClient} from "./axios";

export const PharmacienApi = {
    login: async (data) => {
        return await axiosClient.post('/api/pharmacien/login',data).catch((e) => console.log(e))
    },
    storeOrder: async (data) => {
        return await axiosClient.post('/api/pharmacien/order',data).catch((e) => console.log(e))
    }
}
