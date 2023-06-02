import { Box, Container, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { MediaItemType } from "../../types";
import SingleColumnGrid from "./Discover/disoverAccordianComponents/singleColumn/singleColumnGrid";
import SingleColumnSkeleton from "./Discover/disoverAccordianComponents/singleColumn/singleColumnSkeleton";
import { fetchReleaseDates } from "@/pages/api/dicsoverAPI";
import { fetchSpecific } from "../pages/api/mediaItem";
import { useMediaQuery } from "@mantine/hooks";

export default function DiscoverSpecific(props: {
  mediaType: string;
  title: string;
  params: string;
  pages: number;
  subject: string;
}) {
  const [media, setMedia] = useState<MediaItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllMedia = async () => {
      const mediaData = [];

      // Fetch the first 5 pages of movies
      for (let page = 1; page <= props.pages; page++) {
        const mediaPerPage = await fetchSpecific(
          props.mediaType,
          page,
          props.params
        );

        const mediaWithDetails = await Promise.all(
          mediaPerPage.map(async (media: { id: number }) => {
            const {
              certification,
              runtimeOrEpisodeLength,
              lastAirDate,
              revenue,
            } = await fetchReleaseDates(props.mediaType, media.id);

            // Add the certification and runtime/episode length to the media object
            return {
              ...media,
              certification,
              runtimeOrEpisodeLength,
              lastAirDate,
              revenue,
            };
          })
        );

        mediaData.push(...mediaWithDetails);
      }

      setMedia(mediaData);
      setIsLoading(false);
    };

    fetchAllMedia();
  }, [props.mediaType, props.params, props.pages]);

  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <Container mt="md" size="sm">
      <Title
        c="grey.1"
        fw={desktop ? 500 : 600}
        size={desktop ? "h2" : "h3"}
        order={1}
      >
        {props.title}
      </Title>
      <Box mt="xl">
        {isLoading ? (
          <SingleColumnSkeleton />
        ) : (
          <SingleColumnGrid
            subject={props.subject}
            mediaType={props.mediaType}
            items={media}
          />
        )}
      </Box>
    </Container>
  );
}
