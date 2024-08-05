import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link as RouterLink } from "react-router-dom";
import "./home.css";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Home() {
  // Criando um estado para armazenar filmes
  const [movies, setMovies] = useState([]);

  // Criando um estado para loading
  const [loading, setLoading] = useState(true);

  // Criando um useEffect para carregar os filmes assim que a aplicação abrir
  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "587d74cd16d8202b96fbd8ee84d49a1f",
          language: "pt-BR",
          page: 1,
        },
      });

      // Carregando os filmes no array
      setMovies(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      {movies.map((movie) => {
        return (
          <>
            <Card sx={{ maxWidth: 400 }} className="custom-card">
              <CardMedia
                sx={{ height: 200 }}
                image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                title={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={RouterLink}
                  to={`/movie/${movie.id}`}
                >
                  Acessar
                </Button>
              </CardActions>
            </Card>
          </>
        );
      })}
    </div>
  );
}

export default Home;
