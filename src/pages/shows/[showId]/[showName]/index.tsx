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

  let mediaType = "tv";

  const router = useRouter();
  const { showId, showName } = router.query;

  const [mediaDetails, setMediaDetails] = useState<MediaItemType | null>(null);

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
    <Box bg="dark.9">
      <Container display={mobile ? "none" : "block"}>
        <BannerImage items={mediaDetails} />
      </Container>

      <Container pos="relative" top={mobile ? 0 : -40} py="xl" px={50}>
        <LetterBoxd items={mediaDetails} mediaType="tv" />
        {/* <ColorBanner items={mediaDetails} mediaType="movie" /> */}
        {mediaDetails.credits ? (
          <MediaCredits
            credits={
              mediaType == "movie"
                ? mediaDetails.credits
                : mediaDetails.aggregate_credits
            }
          />
        ) : null}
        <MediaCarousel images={mediaDetails.images} />
        {mediaDetails.similar ? (
          <MediaSimilar similar={mediaDetails.recommendations} />
        ) : null}
      </Container>
    </Box>
  );
}
