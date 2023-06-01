import {
  Anchor,
  AspectRatio,
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Spoiler,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { BsFillStarFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { MediaItemType } from "../../../types";
import Trailer from "../mediaDetails.tsx/trailer";
import { formatReleaseDate } from "../Discover/discoverGrid";
import { useMediaQuery } from "@mantine/hooks";

interface LetterBoxdProp {
  items: MediaItemType;
  mediaType: string;
}

export function LetterBoxd({ items, mediaType }: LetterBoxdProp) {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");
  const tablet = useMediaQuery("(max-width: 950px)");
  const mobile = useMediaQuery("(max-width: 500px)");

  const theme = useMantineTheme();

  const trailers = items.videos.results.filter(
    (video) => video.type === "Trailer"
  );

  return (
    <Box>
      <Grid gutter="xl">
        <Grid.Col span={12} xs={4} sm={3}>
          <AspectRatio ratio={2 / 3}>
            <Image
              fill
              alt=""
              src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
              style={{
                borderRadius: "4px",
                border: ".5px solid #3F3F46",
              }}
            ></Image>
          </AspectRatio>
          {trailers.length > 0 ? <Trailer trailer={trailers[0]} /> : null}
        </Grid.Col>
        <Grid.Col span={12} xs={8} sm={9}>
          <Box>
            <Title size="h2">{items.title || items.name}</Title>
            <Flex gap={6}>
              <Text fz={mobile ? "sm" : "md"} c="brand.2">
                {" "}
                {items.release_date?.substring(0, 4) ||
                  items.first_air_date?.substring(0, 4)}
                {mediaType === "tv" && items.lastAirDate
                  ? `-${items.lastAirDate.substring(0, 4)}`
                  : null}
              </Text>
              <Text fz={mobile ? "sm" : "md"} c="dimmed">
                Directed by
              </Text>
              <Text lineClamp={1}>
                {items.directingCrew?.map((crew, index) => (
                  <Text fz={mobile ? "sm" : "md"} c="brand.2" key={crew.id}>
                    {crew.name}
                    {items.directingCrew &&
                    items.directingCrew &&
                    index !== items.directingCrew.length - 1 ? (
                      <>, </>
                    ) : null}
                  </Text>
                ))}
              </Text>

              <Group fz="sm" spacing={5} display={desktop ? "flex" : "none"}>
                <Divider
                  display={mobile ? "none" : "block"}
                  my={2}
                  mx={6}
                  color="dark.3"
                  orientation="vertical"
                />{" "}
                {items.genres
                  ?.slice(0, tablet ? 2 : 3) // Use the slice() method to get the first three items
                  .map((genre, index) => (
                    <Group spacing={0} key={genre.id}>
                      <Anchor
                        fw={300}
                        component={Link}
                        href="https://mantine.dev/"
                        target="_blank"
                      >
                        {genre.name}
                      </Anchor>

                      <Text fw={300}>
                        {" "}
                        {items.genres &&
                        index !== 3 &&
                        index !==
                          items.genres.slice(0, tablet ? 2 : 3).length - 1 ? (
                          <>,</>
                        ) : null}
                      </Text>
                    </Group>
                  ))}
              </Group>
            </Flex>
            {items.tagline && (
              <Text fz="sm" mt="md" c="dimmed" italic>
                {items.tagline}
              </Text>
            )}
            <Title mt="xl" fw={600} size="h5">
              Plot
            </Title>
            <Spoiler
              mt={6}
              fz="sm"
              maxHeight={70}
              showLabel="Read more"
              hideLabel="Read less"
              styles={(theme) => ({
                control: {
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.blue[7],
                },
              })}
            >
              {items.overview}
            </Spoiler>
            <Divider my="xs" color="dark.5" />
            <Title fw={600} size="h5" pt="sm">
              Details
            </Title>
            <SimpleGrid
              mt={desktop ? 6 : "xs"}
              cols={desktop ? 2 : 1}
              spacing="xs"
              fz="sm"
            >
              <Flex gap={5}>
                <Text fw={500}>Score:</Text>
                <Group spacing={4}>
                  <BsFillStarFill size={12} color="#ffd452" />
                  <Text c="dark.0" fz="sm">
                    {items.vote_average?.toFixed(1)}
                  </Text>
                </Group>
              </Flex>
              <Flex gap={5}>
                <Text fw={500}>MPAA Rating: </Text>

                <Group>
                  <Text
                    fz="xs"
                    px="xs"
                    fw={300}
                    sx={(theme) => ({
                      border: ".5px solid",
                      borderColor: theme.colors.dark[0],
                    })}
                  >
                    {items.certification}
                  </Text>
                </Group>
              </Flex>
              <Flex gap={5}>
                <Text fw={500}>Runtime:</Text>
                <Text c="dark.0">{items.formattedRuntime}</Text>
              </Flex>
              {mediaType === "movie" ? (
                <Flex gap={5}>
                  <Text fw={500}>Budget:</Text>
                  <Text c="dark.0" fw={300}>
                    ${items.budget?.toLocaleString()}
                  </Text>
                </Flex>
              ) : (
                <Flex gap={5}>
                  <Text fw={500}>Seasons:</Text>
                  <Text c="dark.0" fw={300}>
                    {items.number_of_seasons?.toLocaleString()}
                  </Text>
                </Flex>
              )}
              <Flex gap={5}>
                <Text fw={500}>Release Date:</Text>
                <Text c="dark.0" fw={300}>
                  {formatReleaseDate(
                    items.release_date || items.first_air_date
                  )}
                </Text>
              </Flex>
              {mediaType === "movie" ? (
                <Flex gap={5}>
                  <Text fw={500}>Box Office:</Text>
                  <Text c="dark.0" fw={300}>
                    ${items.revenue?.toLocaleString()}
                  </Text>
                </Flex>
              ) : (
                <Flex gap={5}>
                  <Text fw={500}>Episodes:</Text>
                  <Text c="dark.0" fw={300}>
                    {items.number_of_episodes?.toLocaleString()}
                  </Text>
                </Flex>
              )}
            </SimpleGrid>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
