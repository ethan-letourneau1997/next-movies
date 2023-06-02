import { Box, Container } from "@mantine/core";
import { useEffect, useState } from "react";

import BannerImage from "@/components/mediaDetails.tsx/bannerImage";
import { LetterBoxd } from "@/components/mediaDetails.tsx/letterboxd";
import { MediaCarousel } from "@/components/mediaDetails.tsx/imageCarousels";
import MediaCredits from "@/components/mediaDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../types";
import MediaSimilar from "@/components/mediaDetails.tsx/mediaSimilar";
import { fetchMediaDetails } from "@/pages/api/mediaItem";
import { useMediaQuery } from "@mantine/hooks";

interface MediaDetailsLayoutProps {
  mediaType: string;
  mediaId: string;
}

export default function MediaDetailsLayout({
  mediaType,
  mediaId,
}: MediaDetailsLayoutProps) {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 950px)");
  const tablet = useMediaQuery("(max-width: 950px)");
  const mobile = useMediaQuery("(max-width: 500px)");

  //   const router = useRouter();
  //   const { movieId, movieName } = router.query;

  const [mediaDetails, setMediaDetails] = useState<MediaItemType | null>(null);

  useEffect(() => {
    if (!mediaId) {
      return;
    }

    async function fetchDetails() {
      try {
        const details = await fetchMediaDetails(mediaType, parseInt(mediaId));
        setMediaDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [mediaId, mediaType]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box bg="dark.9">
      <Container display={mobile ? "none" : "block"}>
        <BannerImage items={mediaDetails} />
      </Container>

      <Container pos="relative" top={mobile ? 0 : -40} py="xl" px={50}>
        <LetterBoxd mediaItem={mediaDetails} mediaType="movie" />
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
