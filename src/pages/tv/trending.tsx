import { useEffect, useState } from "react";

import { Container } from "@mantine/core";
import MediaGrid from "@/components/mediaGrid";
import { MediaItemType } from "../../../types";
import { fetchTrending } from "../api/tmdb";

export default function Trending() {
  const mediaType = "tv";

  const [shows, setShows] = useState<MediaItemType[]>([]);

  useEffect(() => {
    fetchTrending(mediaType)
      .then((data) => {
        setShows(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container size="xl">
      <MediaGrid title="Trending Shows" items={shows} />
    </Container>
  );
}
