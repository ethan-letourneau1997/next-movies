import { useEffect, useState } from "react";

import { Container } from "@mantine/core";
import MediaGrid from "@/components/mediaGrid";
import { MediaItemType } from "../../../types";
import { fetchTrending } from "../api/generalAPI";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Trending() {
  const mediaType = "movie";

  const [movies, setMovies] = useState<MediaItemType[]>([]);

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
      <MediaGrid title={"Trending Movies"} items={movies} />
    </Container>
  );
}
