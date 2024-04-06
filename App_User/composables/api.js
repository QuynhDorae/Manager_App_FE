import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8081/api'
})

api.defaults.headers.common[ "Content-Type" ] = "application/json";
api.defaults.headers.common[ "Accept" ] = "application/json";
api.defaults.headers.common["Authorization"] = `Bearer ${useCookie('token').value}`;

api.interceptors.request.use(async (config) => {
    const token = useCookie('token')
    if (token.value) config.headers["Authorization"] = `Bearer ${token.value}`
    return config;
}, (err) => Promise.reject(err))

api.interceptors.response.use((response) => {
    const token = useCookie('token')
    // Check and add the token to the request header
    if (token.value) api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
    return response;
}, async (err) => {
    if (err.response && err.response.status === 401) {
        alert('Unauthenticated')
        window.location.replace('/')
    }
    return Promise.reject(error);
});

export default api;