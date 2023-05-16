import { Box, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { EpisodeDetails } from "../../../types";
import Link from "next/link";
import { SeasonType } from "../../../types";
import { useRouter } from "next/router";

interface SeasonProps {
  showId: number;
  seasonNumber: number;
  onSeasonChange: (seasonNumber: number) => void;
}

export default function Season(props: SeasonProps) {
  const [season, setSeason] = useState<SeasonType | null>(null);
  const apiKey = "0fd7a8764e6522629a3b7e78c452c348";

  const router = useRouter();
  const { showId, showName } = router.query;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${props.showId}/season/${props.seasonNumber}?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data: SeasonType) => setSeason(data))
      .catch((error) => console.error(error));
  }, [props.showId, props.seasonNumber, apiKey]);

  if (!season) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Link href="#"></Link>
      <Title order={1}>{season.name}</Title>

      <Box>
        {season.episodes &&
          season.episodes.map((episode) => (
            <Box key={episode.id}>
              <Link
                href={`episode/${props.showId}-${episode.season_number}-${episode.episode_number}`}
              >
                {episode.name}
              </Link>
              <Link
                href={{
                  pathname: `/show/${showId}/${
                    typeof showName === "string"
                      ? encodeURIComponent(showName)
                      : ""
                  }/season/${episode.season_number}/episode/${
                    episode.episode_number
                  }`,
                }}
              >
                See all episode and seasons
              </Link>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
