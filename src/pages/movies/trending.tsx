import {
  Box,
  Center,
  Container,
  Image,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Trending() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container size="xl">
      <Title>Trending</Title>
      <SimpleGrid cols={6}>
        {movies.map((movie) => (
          <Box key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div>{movie.title}</div>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
