import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Loader,
  Paper,
  Skeleton,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { fetchReleaseDates, fetchTop100 } from "../pages/api/tmdb";
import { useEffect, useState } from "react";

import { BsFillStarFill } from "react-icons/bs";
import Image from "next/image";
import { MediaItemType } from "../../types";
import { useMediaQuery } from "@mantine/hooks";

export default function MediaTop100(props: { mediaType: string }) {
  const [media, setMedia] = useState<MediaItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllMedia = async () => {
      const mediaData = [];

      // Fetch the first 5 pages of movies
      for (let page = 1; page <= 5; page++) {
        const mediaPerPage = await fetchTop100(
          props.mediaType,
          page,
          props.mediaType === "movie" ? 5000 : 1000
        );

        // Fetch the release dates and runtime/episode length for each media
        const mediaWithDetails = await Promise.all(
          mediaPerPage.map(async (media: { id: number }) => {
            const { certification, runtimeOrEpisodeLength, lastAirDate } =
              await fetchReleaseDates(props.mediaType, media.id);

            // Add the certification and runtime/episode length to the media object
            return {
              ...media,
              certification,
              runtimeOrEpisodeLength,
              lastAirDate,
            };
          })
        );

        mediaData.push(...mediaWithDetails);
      }

      setMedia(mediaData);
      setIsLoading(false);
    };

    fetchAllMedia();
  }, [props.mediaType]);

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
        Top 100 {props.mediaType == "movie" ? "Movies" : "Shows"}
      </Title>
      <Box mt="xl">
        {isLoading ? (
          <>
            <Grid>
              <Grid.Col span="content" px="sm">
                <Paper shadow="xl">
                  <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
                    <Skeleton />
                  </AspectRatio>
                </Paper>
              </Grid.Col>
              <Grid.Col span="auto">
                <Skeleton
                  mt={desktop ? 12 : 10}
                  height={desktop ? 12 : 10}
                  w="10%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />

                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
              </Grid.Col>
            </Grid>
            <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
            <Grid>
              <Grid.Col span="content" px="sm">
                <Paper shadow="xl">
                  <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
                    <Skeleton />
                  </AspectRatio>
                </Paper>
              </Grid.Col>
              <Grid.Col span="auto">
                <Skeleton
                  mt={desktop ? 12 : 10}
                  height={desktop ? 12 : 10}
                  w="10%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />

                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
              </Grid.Col>
            </Grid>
            <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
            <Grid>
              <Grid.Col span="content" px="sm">
                <Paper shadow="xl">
                  <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
                    <Skeleton />
                  </AspectRatio>
                </Paper>
              </Grid.Col>
              <Grid.Col span="auto">
                <Skeleton
                  mt={desktop ? 12 : 10}
                  height={desktop ? 12 : 10}
                  w="10%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />

                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
              </Grid.Col>
            </Grid>
            <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
            <Grid>
              <Grid.Col span="content" px="sm">
                <Paper shadow="xl">
                  <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
                    <Skeleton />
                  </AspectRatio>
                </Paper>
              </Grid.Col>
              <Grid.Col span="auto">
                <Skeleton
                  mt={desktop ? 12 : 10}
                  height={desktop ? 12 : 10}
                  w="10%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />

                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
              </Grid.Col>
            </Grid>
            <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
            <Grid>
              <Grid.Col span="content" px="sm">
                <Paper shadow="xl">
                  <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
                    <Skeleton />
                  </AspectRatio>
                </Paper>
              </Grid.Col>
              <Grid.Col span="auto">
                <Skeleton
                  mt={desktop ? 12 : 10}
                  height={desktop ? 12 : 10}
                  w="10%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />
                <Skeleton
                  mt={8}
                  height={desktop ? 12 : 10}
                  w="30%"
                  radius="xl"
                />

                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
                <Skeleton mt={8} height={desktop ? 12 : 10} radius="xl" />
              </Grid.Col>
            </Grid>
            <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
          </>
        ) : (
          media.map((item, index) => (
            <Box key={item.id}>
              <Grid>
                <Grid.Col span="content" px="sm">
                  <Paper shadow="xl">
                    <AspectRatio w={desktop ? 100 : 80} ratio={2 / 3}>
                      <Image
                        style={{
                          borderRadius: "4px",
                          border: "1px solid hsla(0, 0%, 30%, .25)",
                        }}
                        alt="poster"
                        src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                        fill
                      />
                    </AspectRatio>
                  </Paper>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Text fz={desktop ? "sm" : "xs"} fw={400}>
                    {index + 1}{" "}
                  </Text>
                  <Title size={desktop ? "h4" : "h5"} order={2}>
                    {item.title || item.name}
                  </Title>
                  <Flex mt={1} align="center" gap={3}>
                    <BsFillStarFill size={desktop ? 14 : 12} color="#ffd452" />
                    <Flex pt={1} gap="xs">
                      <Text fz={desktop ? "sm" : "xs"} fw={600}>
                        {" "}
                        {item.vote_average}
                      </Text>
                      <Text c="brand.3" fw={500} fz={desktop ? "sm" : "xs"}>
                        {item.certification}
                      </Text>
                      <Text c="brand.3" fw={500} fz={desktop ? "sm" : "xs"}>
                        {" "}
                        {item.release_date?.substring(0, 4) ||
                          item.first_air_date?.substring(0, 4)}
                        {props.mediaType === "tv" && item.lastAirDate
                          ? `-${item.lastAirDate.substring(0, 4)}`
                          : null}
                      </Text>
                      <Text c="brand.3" fw={500} fz={desktop ? "sm" : "xs"}>
                        {item.runtimeOrEpisodeLength}
                      </Text>
                    </Flex>
                  </Flex>
                  <Spoiler
                    fz={desktop ? "sm" : "xs"}
                    maxHeight={desktop ? 50 : 40}
                    showLabel="Read More"
                    hideLabel="Read Less"
                  >
                    <Text fz={desktop ? "sm" : "xs"} mt={3}>
                      {" "}
                      {item.overview}
                    </Text>
                  </Spoiler>
                </Grid.Col>
              </Grid>
              <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
}
