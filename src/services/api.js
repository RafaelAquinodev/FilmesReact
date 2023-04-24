import axios from 'axios';
//base da url
//url da api

//instalando o axios

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;


