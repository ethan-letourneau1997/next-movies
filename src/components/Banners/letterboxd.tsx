import {
  AspectRatio,
  BackgroundImage,
  Box,
  Container,
  Flex,
  Grid,
  Group,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";

import { BsFillStarFill } from "react-icons/bs";
import Image from "next/image";
import { MediaItemType } from "../../../types";
import { useMediaQuery } from "@mantine/hooks";

interface LetterBoxdProp {
  items: MediaItemType;
  mediaType: string;
}

export function LetterBoxd({ items, mediaType }: LetterBoxdProp) {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <Container
      size="md"
      // mt="md"
    >
      <Box>
        {/* <Box pos="relative">
          <Box
            pos="relative"
            bottom={-10}
            w="100%"
            h={10}
            sx={{
              zIndex: 1000,
              backgroundImage:
                "linear-gradient(to bottom, #18181B, transparent)",
            }}
          ></Box>
        </Box> */}
        <AspectRatio ratio={16 / 7}>
          <BackgroundImage
            src={`https://image.tmdb.org/t/p/original${items.backdrop_path}`}
          >
            <Group position="apart" h="100%" w="100%">
              <Box h="100%" w={30} pos="relative">
                <Box
                  h="100%"
                  w="100%"
                  pos="absolute"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #101113, transparent)",
                  }}
                />
              </Box>
              <Box h="100%" w={100} pos="relative">
                <Box
                  h="100%"
                  w="100%"
                  pos="absolute"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to left, #101113, transparent)",
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
              backgroundImage: "linear-gradient(to top, #101113, transparent)",
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
              src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
              style={{
                borderRadius: "4px",
                border: ".5px solid #3F3F46",
              }}
            ></Image>
          </AspectRatio>
        </Grid.Col>
        <Grid.Col span={9}>
          <Box>
            <Title size="h2">{items.title}</Title>
            <Group spacing="md" mt={2} pl={5}>
              <Group spacing={4}>
                <BsFillStarFill color="#ffd452" />
                <Text fw={600}>{items.vote_average?.toFixed(1)}</Text>
              </Group>
              <Text c="brand.3" fw={500}>
                {" "}
                {items.release_date?.substring(0, 4) ||
                  items.first_air_date?.substring(0, 4)}
                {mediaType === "tv" && items.lastAirDate
                  ? `-${items.lastAirDate.substring(0, 4)}`
                  : null}
              </Text>
              <Text>{items.formattedRuntime}</Text>
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
                {items.certification}
              </Text>
            </Group>
            {items.tagline && (
              <Text mt="lg" c="dimmed" italic>
                {items.tagline}
              </Text>
            )}
            <Spoiler
              mt="xl"
              maxHeight={75}
              showLabel="Show more"
              hideLabel="Hide"
            >
              {items.overview}
            </Spoiler>
            <Grid mt="md">
              <Grid.Col md={6}>
                {" "}
                <Text fz="sm">Budget</Text>
                <Text fw={400} c="dark.0">
                  {" "}
                  ${items.budget?.toLocaleString()}
                </Text>
              </Grid.Col>
              <Grid.Col md={6}>
                <Text fz="sm">Directed by:</Text>
                <Flex>
                  {items.directingCrew
                    ?.slice(0, 2) // Use the slice() method to get the first three items
                    .map((crew, index) => (
                      <Text fw={500} key={crew.id}>
                        {crew.name}
                        {items.genres &&
                        index !== 2 &&
                        index !== items.genres.slice(0, 2).length - 1 ? (
                          <>,&nbsp;</>
                        ) : null}
                      </Text>
                    ))}
                </Flex>
              </Grid.Col>
              <Grid.Col md={6}>
                <Text fz="sm">Box Office:</Text>
                <Text fw={500}> ${items.revenue?.toLocaleString()}</Text>
              </Grid.Col>
              <Grid.Col md={6}>
                <Text fz="sm">Genres:</Text>
                <Flex>
                  {items.genres
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
                        {items.genres &&
                        index !== 2 &&
                        index !== items.genres.slice(0, 3).length - 1 ? (
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
    </Container>
  );
}
