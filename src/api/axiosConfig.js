import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

api.interceptors.request.use((config)=>{
    const token="MI_TOKEN_SECRET_123";
    config.headers.Authorization=`Bearer${token}`;
    console.log(`Peticion enviada a:${config.url}`);
    return config;
});

export default api;
