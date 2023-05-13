import { useEffect, useState } from "react";

import { Container } from "@mantine/core";
import MediaGrid from "@/components/mediaGrid";
import { fetchTrending } from "../../../api/tmdb";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Trending() {
  const mediaType = "tv";

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchTrending(mediaType)
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container size="xl">
      <MediaGrid items={movies} />
    </Container>
  );
}
