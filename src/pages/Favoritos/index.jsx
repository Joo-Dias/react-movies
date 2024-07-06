import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./favoritos.css";

function Favoritos(){
    // Criando um estado para manipular os filmes
    const [movies, setMovies] = useState([]);

    // Criando um useEffect para buscar os filmes no localStorage
    useEffect(() => {
        const myList = localStorage.getItem("@reactmovies");
        setMovies(JSON.parse(myList) || []);
    }, []);

    // Função para retirar o filme na tela e no localStorage
    function handleRemoveMovie(id) {
        let movieFilter = movies.filter((item) => {
            return(item.id !== id)
        });

        setMovies(movieFilter);
        localStorage.setItem("@reactmovies", JSON.stringify(movieFilter));
        toast.success("Filme removido com sucesso!");
    }

    return(
        <div className="my-moviesList">
            <h1>Meus Filmes</h1>

            {movies.length === 0 && <span>Você não possui nenhum filme salvo!</span>}
            <ul>
                {movies.map((movie) => {
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                                <button onClick={() => handleRemoveMovie(movie.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;