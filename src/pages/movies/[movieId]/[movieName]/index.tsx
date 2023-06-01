import { Box, Container } from "@mantine/core";
import { useEffect, useState } from "react";

import BannerImage from "@/components/mediaDetails.tsx/bannerImage";
import { LetterBoxd } from "@/components/Banners/letterboxd";
import { MediaCarousel } from "@/components/mediaDetails.tsx/mediaCarousel";
import MediaCredits from "@/components/mediaDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../../../types";
import MediaSimilar from "@/components/mediaDetails.tsx/mediaSimilar";
import { fetchMediaDetails } from "@/pages/api/generalAPI";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";

export default function MediaItem() {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 950px)");
  const tablet = useMediaQuery("(max-width: 950px)");
  const mobile = useMediaQuery("(max-width: 500px)");

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

  return (
    <Box bg="dark.9">
      <Container display={mobile ? "none" : "block"}>
        <BannerImage items={mediaDetails} />
      </Container>

      <Container pos="relative" top={mobile ? 0 : -40} py="xl" px={50}>
        <LetterBoxd items={mediaDetails} mediaType="movie" />
        {/* <ColorBanner items={mediaDetails} mediaType="movie" /> */}
        {mediaDetails.credits ? (
          <MediaCredits credits={mediaDetails.credits} />
        ) : null}
        <MediaCarousel images={mediaDetails.images} />
        {mediaDetails.similar ? (
          <MediaSimilar similar={mediaDetails.recommendations} />
        ) : null}
      </Container>
    </Box>
  );
}
