import { Center, Container, Flex, Image, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import MediaCredits from "@/components/movieDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../../../types";
import MediaSimilar from "@/components/movieDetails.tsx/mediaSimilar";
import { fetchMediaDetails } from "@/pages/api/tmdb";
import { useRouter } from "next/router";

export default function MediaItem() {
  const router = useRouter();
  const { movieId, movieName } = router.query;

  const [mediaDetails, setMediaDetails] = useState<MediaItemType | null>(null);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function fetchDetails() {
      try {
        const id = movieId as string;
        const details = await fetchMediaDetails("movie", parseInt(id));
        setMediaDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [movieId]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Center>
        <Title>{mediaDetails.title}</Title>
      </Center>
      <Flex mt="xl" gap="xl">
        <Image
          width="200"
          src={`https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}`}
          alt="alt text"
        ></Image>
        <Text my="auto">{mediaDetails.overview}</Text>
      </Flex>
      {mediaDetails.credits && <MediaCredits credits={mediaDetails.credits} />}
      {mediaDetails.similar && <MediaSimilar similar={mediaDetails.similar} />}
    </Container>
  );
}
