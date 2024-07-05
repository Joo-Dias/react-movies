// Base da URL da API: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=587d74cd16d8202b96fbd8ee84d49a1f&language=pt-BR
// Chave da API: 587d74cd16d8202b96fbd8ee84d49a1f

// Utilizando o AXIOS para fazer a requisição
import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;