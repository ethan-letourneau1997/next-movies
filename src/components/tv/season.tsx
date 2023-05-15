import { Box, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { SeasonType } from "../../../types";

interface SeasonProps {
  showId: number;
  seasonNumber: number;
  onSeasonChange: (seasonNumber: number) => void;
}

export default function Season(props: SeasonProps) {
  const [season, setSeason] = useState<SeasonType | null>(null);
  const apiKey = "0fd7a8764e6522629a3b7e78c452c348";

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
      <Title order={1}>{season.name}</Title>
      <Box>
        {season.episodes &&
          season.episodes.map((episode) => (
            <Box key={episode.id}>
              <Text>{episode.name}</Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
