import { Box, Select, SelectItem } from "@mantine/core";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Season from "@/components/tvComponents/season";
import { SeasonType } from "../../../../../../types";
import { useRouter } from "next/router";

export default function Seasons({}) {
  const router = useRouter();
  const { slug } = router.query;

  const path = router.pathname;
  console.log(path);

  let showId = slug as string;
  const [seasons, setSeasons] = useState<SeasonType[]>([]);
  const [currentSeason, setCurrentSeason] = useState(1); // initialize with first season
  const apiKey = "0fd7a8764e6522629a3b7e78c452c348";
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&append_to_response=seasons, episodes`
    )
      .then((response) => response.json())
      .then((data) => {
        setSeasons(data.seasons.reverse()); // reverse the order of seasons array
        setCurrentSeason(data.seasons[0].season_number); // set current season to the first season
      })
      .catch((error) => console.error(error));
  }, [showId, apiKey]);

  const handleSeasonChange = (seasonNumber: number) => {
    setCurrentSeason(seasonNumber);
  };

  let seasonSelectData: SelectItem[] = [];

  if (seasons && seasons.length > 0) {
    seasonSelectData = seasons.map((season) => {
      return {
        value: season.season_number?.toString() ?? "0",
        label: `${season.name} - ${season.episode_count}`,
      };
    });
  }

  seasonSelectData.reverse(); // reverse the order of seasonSelectDate array

  return (
    <div>
      <h2>Seasons:</h2>

      <Select
        data={seasonSelectData}
        value={currentSeason.toString()}
        onChange={(value) => handleSeasonChange(parseInt(value ?? "1"))}
      />

      {seasons &&
        seasons.map((season) => (
          <Box key={season.id}>
            {currentSeason === season.season_number && (
              <Season
                showId={Number(showId)}
                seasonNumber={season.season_number}
                onSeasonChange={handleSeasonChange}
              />
            )}
          </Box>
        ))}
    </div>
  );
}
