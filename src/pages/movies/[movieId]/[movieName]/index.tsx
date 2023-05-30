import {
  AspectRatio,
  BackgroundImage,
  Box,
  Container,
  Flex,
  Grid,
  Group,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { darkenColorForContrast, hexToRGBA, rgbToHex } from "@/utils";
import { useEffect, useState } from "react";

import { BsFillStarFill } from "react-icons/bs";
import Color from "color-thief-react";
import ColorBanner from "@/components/Banners/colorBanner";
import Image from "next/image";
import { LetterBoxd } from "@/components/Banners/letterboxd";
import MediaCredits from "@/components/mediaDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../../../types";
import MediaSimilar from "@/components/mediaDetails.tsx/mediaSimilar";
import MobileCollapse from "../../../../components/navigation/mobileCollapse";
import { Palette } from "color-thief-react";
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

  return (
    <>
      <LetterBoxd items={mediaDetails} mediaType="movie" />
      <ColorBanner items={mediaDetails} mediaType="movie" />
      {mediaDetails.credits ? (
        <MediaCredits credits={mediaDetails.credits} />
      ) : null}
      {mediaDetails.similar ? (
        <MediaSimilar similar={mediaDetails.similar} />
      ) : null}
    </>
  );
}
