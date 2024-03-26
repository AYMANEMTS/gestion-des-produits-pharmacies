import axios from "axios";
import secureLocalStorage from "react-secure-storage";


export const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'multipart/form-data'
    },
})
axiosClient.interceptors.request.use((config) => {
    const token = secureLocalStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});