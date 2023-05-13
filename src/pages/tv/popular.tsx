import { useEffect, useState } from "react";

import { Container } from "@mantine/core";
import MediaGrid from "@/components/mediaGrid";
import { fetchPopular } from "../../../api/tmdb";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Popular() {
  const mediaType = "tv";

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchPopular(mediaType)
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
