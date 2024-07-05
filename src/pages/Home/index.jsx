import { useEffect, useState } from "react";
import api from "../../services/api";

function Home() {
    // Criando um estado para armazenar filmes
    const [movies, setMovies] = useState([]);

    // Criando um useEffect para carregar os filmes
    useEffect(() => {
        async function loadMovies(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "587d74cd16d8202b96fbd8ee84d49a1f",
                    language: "pt-BR",
                    page: 1
                }
            });

            
        }

        loadMovies();
    }, []);

    return(
        <div>
            <h1>HOME</h1>
        </div>
    );
}

export default Home;