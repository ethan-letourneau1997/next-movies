import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import Link from "next/link";
import MediaCredits from "@/components/movieDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../types";
import MediaSimilar from "@/components/movieDetails.tsx/mediaSimilar";
import Seasons from "./seasons/[slug]";
import { TVRoot } from "../../../types";
import { fetchMediaDetails } from "../api/tmdb";
import { useRouter } from "next/router";

export default function MediaItem() {
  const mediaType = "tv";
  const router = useRouter();
  const { slug } = router.query;
  let str = slug as string;
  const num = parseInt(str);

  const [mediaDetails, setMediaDetails] = useState<TVRoot | null>(null);

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

  console.log(mediaDetails);

  return (
    <Container>
      <Center>
        <Title>{mediaDetails.name}</Title>
      </Center>
      <Flex mt="xl" gap="xl">
        <Image
          width="200"
          src={`https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}`}
          alt="alt text"
        ></Image>
        <Text my="auto">{mediaDetails.overview}</Text>
      </Flex>
      <Link href={`seasons/${mediaDetails.id}`}>
        See all episode and seasons
      </Link>

      <SimpleGrid cols={2} mt="xl">
        <Box>
          <Text>
            {mediaDetails.last_episode_to_air && (
              <Text>{mediaDetails.last_episode_to_air.name}</Text>
            )}
          </Text>
        </Box>
        <Box>
          {mediaDetails.next_episode_to_air &&
            mediaDetails.next_episode_to_air.name}
        </Box>
      </SimpleGrid>
      {mediaDetails.credits && <MediaCredits credits={mediaDetails.credits} />}
      {mediaDetails.similar && <MediaSimilar similar={mediaDetails.similar} />}
    </Container>
  );
}
