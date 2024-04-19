import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    responseType: 'json',
})

const addAuthorizationHeader = async (config) => {
    const token = await localStorage.getItem('@TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

axios.interceptors.request.use(
    async (config) => await addAuthorizationHeader(config),
    (error) => Promise.reject(error)
);

export default api