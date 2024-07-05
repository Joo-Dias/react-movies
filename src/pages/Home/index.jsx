import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    // Criando um estado para armazenar filmes
    const [movies, setMovies] = useState([]);

    // Criando um estado para loading
    const [loading, setLoading] = useState(true);

    // Criando um useEffect para carregar os filmes assim que a aplicação abrir
    useEffect(() => {
        async function loadMovies(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "587d74cd16d8202b96fbd8ee84d49a1f",
                    language: "pt-BR",
                    page: 1
                }
            });

            // Carregando os filmes no array
            setMovies(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadMovies();
    }, []);

    if(loading) {
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        );
    }
    return(
        <div className="container">
            <div className="movie-list">
                {movies.map((movie) => {
                    return(
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;