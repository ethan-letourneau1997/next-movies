import { Box, Flex, Text, Title } from "@mantine/core";
import { EpisodeDetails, TVRoot } from "../../../../../types";
import { useEffect, useState } from "react";

import Link from "next/link";
import { SeasonType } from "../../../../../types";
import { fetchMediaDetails } from "@/pages/api/tmdb";
import { useRouter } from "next/router";

export default function Episode() {
  const router = useRouter();
  const { slug } = router.query;

  // Split slug by "-" separator
  const [showId, season_number, episodeNumber] =
    slug?.toString().split("-").map(Number) || [];

  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(
    null
  );

  // Make API request to get episode details
  useEffect(() => {
    const getEpisodeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${showId}/season/${season_number}/episode/${episodeNumber}?api_key=0fd7a8764e6522629a3b7e78c452c348&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEpisodeDetails(data);
      } catch (error) {
        console.error("Error fetching episode details: ", error);
      }
    };

    getEpisodeDetails();
  }, [showId, episodeNumber]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function fetchDetails() {
      try {
        const details = await fetchMediaDetails("tv", showId);
        setMediaDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [showId]);

  const [mediaDetails, setMediaDetails] = useState<TVRoot | null>(null);

  // get episode count for season
  let episodeCount = null;
  if (mediaDetails && mediaDetails.seasons && episodeDetails) {
    const season = mediaDetails.seasons.find(
      (s: SeasonType) => s.season_number === episodeDetails.season_number
    );
    if (season) {
      episodeCount = season.episode_count;
    }
  }

  if (episodeCount && episodeDetails && episodeDetails.episode_number) {
    var nextEpisodeNumber = episodeDetails.episode_number + 1;
    if (nextEpisodeNumber > episodeCount) {
      nextEpisodeNumber = episodeDetails.episode_number + 1;
    }
  }

  console.log(episodeCount);
  return (
    <Box>
      <Flex bg="dark.6" justify="space-between" py="xl" px="md">
        <Text>Prev Episode</Text>
        <Link
          href={`/shows/${showId}/season/${season_number}/episode/${nextEpisodeNumber}`}
        >
          Next Episode
        </Link>
      </Flex>
      {episodeDetails ? (
        <>
          <Text>
            s{episodeDetails.season_number}e{episodeDetails.episode_number}
          </Text>

          <Title order={1}>{episodeDetails.name}</Title>
          <Box>
            <p></p>
            <p>{episodeDetails.overview}</p>
          </Box>
        </>
      ) : (
        <p>Loading episode details...</p>
      )}
    </Box>
  );
}
