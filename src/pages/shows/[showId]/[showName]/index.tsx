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
import MediaCredits from "@/components/mediaDetails.tsx/mediaCredits";
import MediaSimilar from "@/components/mediaDetails.tsx/mediaSimilar";
import { TVRoot } from "../../../../../types";
import { fetchMediaDetails } from "@/pages/api/tmdb";
import { useRouter } from "next/router";

export default function MediaItem() {
  const router = useRouter();

  const { showId, showName } = router.query;

  const [mediaDetails, setMediaDetails] = useState<TVRoot | null>(null);

  useEffect(() => {
    if (!showId) {
      return;
    }

    async function fetchDetails() {
      try {
        const id = showId as string;
        const details = await fetchMediaDetails("tv", parseInt(id));
        setMediaDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [showId]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }

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
      <Link
        href={{
          pathname: `/show/${showId}/${
            typeof showName === "string" ? encodeURIComponent(showName) : ""
          }/seasons`,
        }}
      >
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
