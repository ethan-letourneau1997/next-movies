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

  const theme = useMantineTheme();

  return (
    <Box>
      <Grid gutter="xl">
        <Grid.Col span={3}>
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

          <Trailer mediaDetails={items} />
        </Grid.Col>
        <Grid.Col span={9}>
          <Box>
            <Title size="h2">{items.title}</Title>
            <Flex gap={6}>
              <Text c="brand.2">
                {" "}
                {items.release_date?.substring(0, 4) ||
                  items.first_air_date?.substring(0, 4)}
                {mediaType === "tv" && items.lastAirDate
                  ? `-${items.lastAirDate.substring(0, 4)}`
                  : null}
              </Text>
              <Text c="dimmed">Directed by</Text>
              {items.directingCrew?.map((crew, index) => (
                <Text c="brand.2" key={crew.id}>
                  {crew.name}
                  {items.directingCrew &&
                  items.directingCrew &&
                  index !== items.directingCrew.length - 1 ? (
                    <>, </>
                  ) : null}
                </Text>
              ))}
              <Divider my={2} mx={6} color="dark.3" orientation="vertical" />
              <Group fz="sm" spacing={5}>
                {" "}
                {items.genres
                  ?.slice(0, 3) // Use the slice() method to get the first three items
                  .map((genre, index) => (
                    <Group spacing={3} key={genre.id}>
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
                        index !== items.genres.slice(0, 3).length - 1 ? (
                          <>,&nbsp;</>
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
            s
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
            <SimpleGrid mt={6} cols={2} spacing="xs" fz="sm">
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
              <Flex gap={5}>
                <Text fw={500}>Budget:</Text>
                <Text c="dark.0" fw={300}>
                  ${items.budget?.toLocaleString()}
                </Text>
              </Flex>
              <Flex gap={5}>
                <Text fw={500}>Release Date:</Text>
                <Text c="dark.0" fw={300}>
                  {formatReleaseDate(items.release_date)}
                </Text>
              </Flex>

              <Flex gap={5}>
                <Text fw={500}>Box Office:</Text>
                <Text c="dark.0" fw={300}>
                  ${items.revenue?.toLocaleString()}
                </Text>
              </Flex>
            </SimpleGrid>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
