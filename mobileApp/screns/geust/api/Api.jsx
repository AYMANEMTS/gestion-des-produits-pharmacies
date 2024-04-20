import axiosClient from "./axios"

const Api = {
    getCsrfToken: async () => await axiosClient.get('sanctum/csrf-cookie'),
    getProducts: async () => await axiosClient.get('/api/mobile/products')
    
    
}
export default Api