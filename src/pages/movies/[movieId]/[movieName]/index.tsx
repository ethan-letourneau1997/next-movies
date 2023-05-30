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
import { useEffect, useState } from "react";

import { BsFillStarFill } from "react-icons/bs";
import Image from "next/image";
import MediaCredits from "@/components/mediaDetails.tsx/mediaCredits";
import { MediaItemType } from "../../../../../types";
import MediaSimilar from "@/components/mediaDetails.tsx/mediaSimilar";
import MobileCollapse from "../../../../components/navigation/mobileCollapse";
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
    <Container size="md">
      <Box>
        <AspectRatio ratio={16 / 7}>
          <BackgroundImage
            src={`https://image.tmdb.org/t/p/original${mediaDetails.backdrop_path}`}
          >
            <Group position="apart" h="100%" w="100%">
              <Box h="100%" w={50} pos="relative">
                <Box
                  h="100%"
                  w="100%"
                  pos="absolute"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #18181B, transparent)",
                  }}
                />
              </Box>
              <Box h="100%" w={50} pos="relative">
                <Box
                  h="100%"
                  w="100%"
                  pos="absolute"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to left, #18181B, transparent)",
                  }}
                />
              </Box>
            </Group>
          </BackgroundImage>
        </AspectRatio>
        <Box pos="relative">
          <Box
            pos="absolute"
            top={-50}
            w="100%"
            h={50}
            sx={{
              backgroundImage: "linear-gradient(to top, #18181B, transparent)",
            }}
          ></Box>
        </Box>
      </Box>
      {/* <Box pos="relative"> */}
      <Grid pos="relative" top={-20} px={40} gutter="xl">
        <Grid.Col span={3}>
          <AspectRatio ratio={2 / 3}>
            <Image
              fill
              alt=""
              src={`https://image.tmdb.org/t/p/original${mediaDetails.poster_path}`}
              style={{ borderRadius: "4px", border: ".5px solid #71717A" }}
            ></Image>
          </AspectRatio>
        </Grid.Col>
        <Grid.Col span={9}>
          <Box>
            <Title size="h2">{mediaDetails.title}</Title>
            <Group spacing="md" mt={2} pl={5}>
              <Group spacing={4}>
                <BsFillStarFill color="#ffd452" />
                <Text fw={600}>{mediaDetails.vote_average?.toFixed(1)}</Text>
              </Group>
              <Text c="brand.3" fw={500}>
                {" "}
                {mediaDetails.release_date?.substring(0, 4) ||
                  mediaDetails.first_air_date?.substring(0, 4)}
                {mediaType === "tv" && mediaDetails.lastAirDate
                  ? `-${mediaDetails.lastAirDate.substring(0, 4)}`
                  : null}
              </Text>
              <Text>{mediaDetails.formattedRuntime}</Text>
              <Text
                fz="xs"
                px="xs"
                c="brand.3"
                fw={700}
                sx={(theme) => ({
                  border: "1px solid",
                  borderColor: theme.colors.brand[4],
                })}
              >
                {mediaDetails.certification}
              </Text>
            </Group>
            <Text>{mediaDetails.tagline}</Text>
            <Spoiler
              mt="xl"
              maxHeight={75}
              showLabel="Show more"
              hideLabel="Hide"
            >
              {mediaDetails.overview}
            </Spoiler>
            <Grid mt="md">
              <Grid.Col md={6}>
                {" "}
                <Text fz="sm">Budget</Text>
                <Text fw={500}> ${mediaDetails.budget?.toLocaleString()}</Text>
              </Grid.Col>
              <Grid.Col md={6}>
                <Text fz="sm">Directed by:</Text>
                <Flex>
                  {mediaDetails.directingCrew
                    ?.slice(0, 2) // Use the slice() method to get the first three items
                    .map((crew, index) => (
                      <Text fw={500} key={crew.id}>
                        {crew.name}
                        {mediaDetails.genres &&
                        index !== 2 &&
                        index !== mediaDetails.genres.slice(0, 2).length - 1 ? (
                          <>,&nbsp;</>
                        ) : null}
                      </Text>
                    ))}
                </Flex>
              </Grid.Col>
              <Grid.Col md={6}>
                <Text fz="sm">Box Office:</Text>
                <Text fw={500}> ${mediaDetails.revenue?.toLocaleString()}</Text>
              </Grid.Col>
              <Grid.Col md={6}>
                <Text fz="sm">Genres:</Text>
                <Flex>
                  {mediaDetails.genres
                    ?.slice(0, 3) // Use the slice() method to get the first three items
                    .map((genre, index) => (
                      <Text
                        fw={500}
                        key={genre.id}
                        // mr="xs"
                        // px="sm"
                        // sx={{
                        //   border: "1px solid",
                        //   borderColor: "brand.4",
                        //   borderRadius: "20px",
                        // }}
                      >
                        {genre.name}
                        {mediaDetails.genres &&
                        index !== 2 &&
                        index !== mediaDetails.genres.slice(0, 3).length - 1 ? (
                          <>,&nbsp;</>
                        ) : null}
                      </Text>
                    ))}
                </Flex>
              </Grid.Col>
            </Grid>
          </Box>
        </Grid.Col>
      </Grid>
      {/* </Box> */}
      {mediaDetails.credits && <MediaCredits credits={mediaDetails.credits} />}
      {mediaDetails.similar && <MediaSimilar similar={mediaDetails.similar} />}
    </Container>
  );
}
