import { Box, Container } from "@mantine/core";
import { useEffect, useState } from "react";

import BannerImage from "@/components/mediaDetails.tsx/bannerImage";
import { LetterBoxd } from "@/components/Banners/letterboxd";
import MediaCredits from "@/components/mediaDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../../../types";
import MediaSimilar from "@/components/mediaDetails.tsx/mediaSimilar";
import Trailer from "@/components/mediaDetails.tsx/trailer";
import { fetchMediaDetails } from "@/pages/api/generalAPI";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";

export default function MediaItem() {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  let mediaType = "movie";

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

  const opts = {
    modestbranding: "1",
    controls: "0",
  };

  const trailers = mediaDetails.videos.results
    .filter((video) => video.type === "Trailer")
    .slice(0, 1);

  console.log("trailers");
  console.log(trailers);

  // const trailerId = mediaDetails.videos.results[6].key;
  // console.log(trailerId);

  return (
    <Box bg="dark.9">
      <Container>
        <BannerImage items={mediaDetails} />
      </Container>

      <Container pos="relative" top={-40} py="xl" px={50}>
        <LetterBoxd items={mediaDetails} mediaType="movie" />
        {/* <ColorBanner items={mediaDetails} mediaType="movie" /> */}
        {mediaDetails.credits ? (
          <MediaCredits credits={mediaDetails.credits} />
        ) : null}
        {mediaDetails.similar ? (
          <MediaSimilar similar={mediaDetails.recommendations} />
        ) : null}
      </Container>
    </Box>
  );
}
