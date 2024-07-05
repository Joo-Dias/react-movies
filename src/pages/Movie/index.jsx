import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function Movie() {
  // Pegando o parametro ID pela url
  const { id } = useParams();

  // Criando um estado caso o filme for inválido
  const [movie, setMovie] = useState({});
  
  // Criando um estado para loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "587d74cd16d8202b96fbd8ee84d49a1f",
            language: "pt-BR",
          },
        })
        .then((response) => {
            setMovie(response.data);
            setLoading(false);
        })
        .catch(() => {

        });
    }

    loadMovie();

    return () => {

    }
  }, []);

  if(loading) {
    return(
        <div className="movie-info">
            <h1>Carregando detalhes...</h1>
        </div>
    )
  }

  return (
    <div className="movie-info">
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

        <h3>Sinopse</h3>
        <span>{movie.overview}</span>

        <strong>Avaliação: {movie.vote_average} / 10</strong>
    </div>
  );
}

export default Movie;
