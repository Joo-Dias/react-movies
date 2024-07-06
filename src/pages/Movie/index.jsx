import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

import "./movie.css";

function Movie() {
  // Pegando o parametro ID pela url
  const { id } = useParams();

  // Navegador de páginas
  const navigate = useNavigate();

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
            navigate("/", {
                replace: true
            });
            return;
        });
    }

    loadMovie();

    return () => {

    }
  }, [navigate, id]);

  function saveMovie() {
    const myList = localStorage.getItem("@reactmovies");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id);

    if(hasMovie) {
        toast.warn("Esse filme já está na sua lista!");
        return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@reactmovies", JSON.stringify(savedMovies));
    toast.success("Filme salvo com sucesso!");
  }

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

        <strong>Avaliação: {Math.trunc(movie.vote_average)} / 10</strong>

        <div className="btn-area">
            <button onClick={saveMovie}>Salvar</button>
            <button><a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} trailer`}>Trailer</a></button>
        </div>
    </div>
  );
}

export default Movie;
