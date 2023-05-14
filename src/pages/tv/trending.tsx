import { useEffect, useState } from "react";

import { Container } from "@mantine/core";
import MediaGrid from "@/components/mediaGrid";
import { MediaItemTypes } from "../../../types";
import { fetchTrending } from "../../../api/tmdb";

export default function Trending() {
  const mediaType = "tv";

  const [movies, setMovies] = useState<MediaItemTypes[]>([]);

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
