import { Center, Container, Flex, Image, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import MediaCredits from "@/components/movieDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../types";
import MediaSimilar from "@/components/movieDetails.tsx/mediaSimilar";
import { fetchMediaDetails } from "../api/tmdb";
import { useRouter } from "next/router";

export default function MediaItem() {
  const mediaType = "movie";
  const router = useRouter();
  const { slug } = router.query;

  let str = slug as string;
  const num = parseInt(str);

  const [mediaDetails, setMediaDetails] = useState<MediaItemType | null>(null);

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function fetchDetails() {
      try {
        const details = await fetchMediaDetails(mediaType, num);
        setMediaDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [mediaType, num, slug]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }

  console.log(mediaDetails.similar);

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
