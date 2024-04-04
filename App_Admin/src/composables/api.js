import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8081/api'
})

api.defaults.headers.common[ "Content-Type" ] = "application/json";
api.defaults.headers.common[ "Accept" ] = "application/json";
api.defaults.headers.common[ "Authorization" ] = `Bearer ${document.cookie}`;

api.interceptors.request.use(async (config) => {
    const token = document.cookie
    if (token) config.headers[ "Authorization" ] = `Bearer ${token}`
    return config;
}, (err) => Promise.reject(err))

api.interceptors.response.use((response) => {
    const token = document.cookie
    // Check and add the token to the request header
    if (token) api.defaults.headers.common[ "Authorization" ] = `Bearer ${token}`;
    return response;
}, async (err) => {
    if (err.response && err.response.status === 401) {
        alert('Unauthenticated')
        window.location.replace('/')
    }

    return Promise.reject(error);
});

export default api;