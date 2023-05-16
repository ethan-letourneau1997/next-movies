import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Input,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Cast, Credits, MediaItemType, SearchResults } from "../../types";
import React, { useState } from "react";

import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

export const TmdbSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResults>([]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${value}`
    );
    const data = await response.json();

    // Make additional API calls for movies and shows
    const moviesAndShows = data.results.filter(
      (result: MediaItemType) =>
        result.media_type !== undefined &&
        ["movie", "tv"].includes(result.media_type)
    );

    const movieAndShowCreditsPromises = moviesAndShows.map(
      (result: MediaItemType) =>
        fetch(
          `https://api.themoviedb.org/3/${result.media_type}/${result.id}/credits?api_key=${TMDB_API_KEY}`
        )
          .then((response) => response.json())
          .then((credits) => ({ ...result, credits }))
    );
    const movieAndShowResults = await Promise.all(movieAndShowCreditsPromises);

    // Merge the movie and show results back into the original search results
    const updatedResults = data.results.map((result: MediaItemType) =>
      result.media_type !== undefined &&
      ["movie", "tv"].includes(result.media_type)
        ? movieAndShowResults.find(({ id }) => id === result.id) || result
        : result
    );

    setResults(updatedResults);
  };

  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <div>
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        size="lg"
        withCloseButton={false}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Input
          type="text"
          value={searchTerm}
          placeholder="Search movies, tv shows, and people"
          onChange={(e) => handleSearch(e.target.value)}
          icon={<IconSearch size="1rem" />}
          variant="unstyled"
          size="lg"
        />
        <Stack mah={500} pt="xs">
          {results
            .slice(0, 10)
            .filter((result) => result.poster_path || result.profile_path)
            .map((result) => (
              <Link
                key={result.id}
                href={`/${result.media_type == "movie" ? "movies" : "shows"}/${
                  result.id
                }/${
                  result.title
                    ? encodeURIComponent(result.title)
                    : encodeURIComponent(result.name || "")
                }`}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Flex
                  pt={1}
                  gap="md"
                  key={result.id}
                  sx={(theme) => ({
                    "&:hover": {
                      backgroundColor: theme.colors.dark[5],
                    },
                  })}
                >
                  <Box h={75} w={50}>
                    <Image
                      src={
                        result.media_type == "person"
                          ? `https://image.tmdb.org/t/p/w154${result.profile_path}`
                          : `https://image.tmdb.org/t/p/w154${result.poster_path}`
                      }
                      withPlaceholder
                      alt={result.title}
                    />
                  </Box>
                  <Box>
                    <Text size="lg">{result.title || result.name}</Text>
                    {result.media_type === "movie" ||
                    result.media_type === "tv" ? (
                      <Group spacing={5}>
                        {result.credits?.cast
                          ?.slice(0, 2)
                          .map((castMember, index) => (
                            <Text fz="sm" c="dimmed" key={index}>
                              {castMember.name}
                              {index !==
                                (result.credits?.cast?.slice(0, 2) || [])
                                  .length -
                                  1 && ","}
                            </Text>
                          ))}
                      </Group>
                    ) : (
                      <Group spacing={5}>
                        {result.known_for
                          ?.slice(0, 2)
                          ?.map((knownForItem, index) => (
                            <Text fz="sm" c="dimmed" key={index}>
                              {knownForItem.title || knownForItem.name}&nbsp;(
                              {knownForItem.release_date?.slice(0, 4) ||
                                knownForItem.first_air_date?.slice(0, 4)}
                              )
                              {index !==
                                (result.known_for?.slice(0, 2) || []).length -
                                  1 && ","}
                            </Text>
                          ))}
                      </Group>
                    )}
                  </Box>
                </Flex>
              </Link>
            ))}
        </Stack>
      </Modal>

      <Group position="center">
        <Button
          inset="md"
          onClick={open}
          radius="md"
          bg="dark.7"
          sx={{
            border: ".5px solid grey",
          }}
        >
          <Text c="dark.1">Search</Text>
        </Button>
      </Group>
    </div>
  );
};

export default TmdbSearch;
