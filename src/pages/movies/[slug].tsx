import { Center, Container, Flex, Image, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { MediaItemType } from "../../../types";
import { fetchMediaDetails } from "../../../api/tmdb";
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

  return (
    <Container>
      <Center>
        <Title>{mediaDetails.title}</Title>
        <Title>{mediaDetails.name}</Title>
      </Center>
      <Flex mt="xl" gap="xl">
        <Image
          width="200"
          src={`https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}`}
        ></Image>
        <Text my="auto">{mediaDetails.overview}</Text>
      </Flex>
    </Container>
  );
}
