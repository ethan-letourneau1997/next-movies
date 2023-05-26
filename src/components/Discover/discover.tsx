import {
  Accordion,
  AspectRatio,
  AutocompleteItem,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Container,
  Divider,
  Flex,
  Overlay,
  RangeSlider,
  Select,
  SimpleGrid,
  Spoiler,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { MediaItemType, WatchProvider, WatchProviders } from "../../../types";
import {
  movieGenres,
  runtimeMarks,
  scoreMarks,
  sortByData,
  tvGenres,
} from "../../../data/discoverData";
import { useEffect, useState } from "react";

import { BsChevronRight } from "react-icons/bs";
import { DatePickerInput } from "@mantine/dates";
import DiscoverGrid from "./discoverGrid";
import DiscoverGridLoading from "./discoverGridLoading";
import { IconCalendarTime } from "@tabler/icons-react";
import Image from "next/image";
import KeywordSearch from "../tvComponents/keywords/keywordSearch";
import { dateToString } from "../../pages/api/format";
import { fetchDiscover } from "@/pages/api/dicsover";
import { movieCertifications } from "../../../data/discoverData";
import { useMediaQuery } from "@mantine/hooks";

interface DiscoverTypes {
  items: MediaItemType[];
  sortBy: string;
  selectedGenres: (string | AutocompleteItem | null)[];
  startDate: Date | null;
  endDate: Date;
  keywords: AutocompleteItem[];
}

export default function Discover(props: { type: string }) {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  const isMovie = props.type === "movie";
  const genresData = isMovie ? movieGenres : tvGenres;
  const mediaType = props.type;

  const [items, setMovies] = useState<MediaItemType[]>([]);

  //* Discover state
  const [state, setState] = useState<DiscoverTypes>({
    items: [],
    sortBy: "popularity",
    selectedGenres: [],
    startDate: null,
    endDate: new Date(),
    keywords: [],
  });

  //*Discover functions
  const handleSortBy = (value: string) => {
    setState((prevState) => ({ ...prevState, sortBy: value }));
  };

  const handleStartDateChange = (date: Date | null) => {
    setState((prevState) => ({ ...prevState, startDate: date }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setState((prevState) => ({
      ...prevState,
      endDate: date !== null ? date : new Date(),
    }));
  };

  const handleKeywordClick = (item: AutocompleteItem): void => {
    const keyword = item;
    setState((prevState) => ({
      ...prevState,
      keywords: [...prevState.keywords, keyword],
    }));
  };

  const handleButtonClick = (genreId: string) => {
    if (buttonGenres.includes(genreId)) {
      setButtonGenres(buttonGenres.filter((value) => value !== genreId));
    } else {
      setButtonGenres([...buttonGenres, genreId]);
    }
  };

  // * ---------------  Genres ----------------------

  const [buttonGenres, setButtonGenres] = useState<string[]>([]);

  const selectedGenresString = buttonGenres.map((genre) => genre).join(", ");

  const isGenreSelected = (genreId: string) => buttonGenres.includes(genreId);

  // * --------------- Score Slider ----------------------

  const [scoreValue, setScoreValue] = useState<[number, number]>([0, 100]);
  let bottomScore = (scoreValue[0] / 10).toString();

  let topScore = (scoreValue[1] / 10).toString();

  // * --------------- Runtime Slider ----------------------

  const [runtimeValue, setRuntimeValue] = useState<[number, number]>([0, 400]);

  let runtimeMin = runtimeValue[0].toString();

  let runtimeMax = runtimeValue[1].toString();

  // * --------------- Keyword Search ----------------------

  const keywordString: string = state.keywords
    .map((keyword) => keyword.id)
    .join("|");

  // remove a keyword
  function removeKeyword(id: number): void {
    setState((prevState) => ({
      ...prevState,
      keywords: prevState.keywords.filter((keyword) => keyword.id !== id),
    }));
  }

  // * --------------- Watch Providers ----------------------

  const [providers, setProviders] = useState<WatchProvider[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const selectedProvidersString = selectedProviders
    .map((provider) => provider)
    .join("| ");

  const handleProviderClick = (providerId: string) => {
    if (selectedProviders.includes(providerId)) {
      // Remove id from providers
      setSelectedProviders(
        selectedProviders.filter((value) => value !== providerId)
      );
    } else {
      // Add id to providers
      setSelectedProviders([...selectedProviders, providerId]);
    }
  };

  // * --------------- Certifications ----------------------

  const [certifications, setCertifications] =
    useState<string[]>(movieCertifications);

  const certificationString = certifications
    .map((certification) => certification)
    .join("|");

  // * API calls
  useEffect(() => {
    setIsLoading(true);
    fetchDiscover(
      mediaType,
      state.sortBy,
      selectedGenresString,

      dateToString(state.startDate),
      dateToString(state.endDate),
      bottomScore,
      topScore,
      runtimeMin,
      runtimeMax,
      keywordString,
      selectedProvidersString,
      certificationString
    )
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    state,
    selectedGenresString,
    buttonGenres,
    bottomScore,
    topScore,
    runtimeMin,
    runtimeMax,
    mediaType,
    keywordString,
    selectedProvidersString,
    certificationString,
  ]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ3YTg3NjRlNjUyMjYyOWEzYjdlNzhjNDUyYzM0OCIsInN1YiI6IjY0MDE0MmY4YzcxNzZkMDA5ZDZmMjM5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVopQkVmwaUxWoFjisYglulnsEZvcy9cwHEKA1CFJC4",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=US",
      options
    )
      .then((response) => response.json())
      .then((response) => setProviders(response.results))
      .catch((err) => console.error(err));
  }, []);

  const today = new Date();
  const sixWeeksAgo = new Date(today.getTime() - 6 * 7 * 24 * 60 * 60 * 1000);

  const nextMonday = new Date(
    today.getTime() + ((7 - today.getDay()) % 7) * 24 * 60 * 60 * 1000
  );
  const fourWeeksAfterNextMonday = new Date(
    nextMonday.getTime() + 4 * 7 * 24 * 60 * 60 * 1000
  );

  //* checkbox
  const [checkedAll, setCheckedAll] = useState(true);
  const toggleAll = () => {
    setCheckedAll(!checkedAll);
    handleStartDateChange(null);
    handleEndDateChange(today);
    setCheckedUpcoming(false);
    setCheckedNowPlaying(false);
  };

  const [checkedNowPlaying, setCheckedNowPlaying] = useState(false);
  const toggleNowPlaying = () => {
    setCheckedNowPlaying(!checkedNowPlaying);
    handleStartDateChange(sixWeeksAgo);
    handleEndDateChange(today);
    setCheckedUpcoming(false);
    setCheckedAll(false);
  };

  const [checkedUpcoming, setCheckedUpcoming] = useState(false);

  const toggleUpcoming = () => {
    setCheckedUpcoming(!checkedUpcoming);
    handleStartDateChange(nextMonday);
    handleEndDateChange(fourWeeksAfterNextMonday);
    setCheckedNowPlaying(false);
    setCheckedAll(false);
  };

  console.log(mediaType);

  return (
    <Flex mt="xl">
      <Box miw={250} maw={250} mx="md" display={desktop ? "block" : "none"}>
        <Accordion
          variant="separated"
          chevron={<BsChevronRight size={14} />}
          defaultValue="filters"
          styles={(theme) => ({
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(90deg)",
              },
            },
            content: {
              backgroundColor: theme.colors.dark[8],
              paddingLeft: 0,
              paddingRight: 0,
            },
            control: {
              // backgroundColor: theme.colors.dark[8],
              "&[data-active]": {
                backgroundColor: theme.colors.dark[8],
              },
            },
          })}
        >
          <Accordion.Item value="sort by">
            <Accordion.Control px="md">
              {" "}
              <Text fw={500}>Sort by</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Divider mb="lg"></Divider>
              <Box px="md">
                <Select
                  label="Sort Results By"
                  defaultChecked
                  defaultValue="popularity"
                  placeholder="Pick one"
                  onChange={(value: string) => handleSortBy(value)}
                  data={sortByData}
                  styles={(theme) => ({
                    label: {
                      fontSize: theme.fontSizes.md,
                      fontWeight: 300,
                      marginBottom: 8,
                    },
                  })}
                />
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="where to watch">
            <Accordion.Control px="md">
              {" "}
              <Text fw={500}>Where to Watch</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Box px="md">
                <Divider mb="lg"></Divider>
                <Text>Sort results by provider:</Text>
                <Spoiler
                  mt="xs"
                  maxHeight={220}
                  showLabel="See all"
                  fz="Hile all"
                  hideLabel="Hide"
                  transitionDuration={0}
                  styles={{
                    control: {},
                  }}
                >
                  {/* Content here */}
                  <SimpleGrid cols={4} spacing="xs">
                    {providers.map((provider) => (
                      <Tooltip
                        fz="xs"
                        label={provider.provider_name}
                        key={provider.provider_id}
                      >
                        <AspectRatio
                          // handle provider click and add or remove from selectedProviders
                          onClick={() =>
                            handleProviderClick(provider.provider_id)
                          }
                          ratio={1 / 1}
                          sx={{
                            border: selectedProviders.includes(
                              provider.provider_id
                            )
                              ? "2px solid #fcc419"
                              : "none", // Add border if ID is in state
                            borderRadius: "6px",
                            "&:hover": {
                              border: "2px solid #fcc419",
                            },
                          }}
                        >
                          <Overlay
                            color="#fcc419"
                            sx={{
                              opacity: selectedProviders.includes(
                                provider.provider_id
                              )
                                ? 0.5
                                : 0, // Add border if ID is in state
                              borderRadius: "6px",
                              "&:hover": {
                                border: "2px solid #fcc419",
                              },
                            }}
                          ></Overlay>
                          <Image
                            fill
                            style={{
                              borderRadius: "4px",
                              // border: "1px solid hsla(0, 0%, 30%, .25)",
                            }}
                            alt="poster"
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          />
                        </AspectRatio>
                      </Tooltip>
                    ))}
                  </SimpleGrid>
                </Spoiler>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="filters">
            <Accordion.Control px="md">
              <Text fw={500}>Filters</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Divider mb="lg"></Divider>
              {isMovie ? (
                <>
                  <Box px="md">
                    <Text fw={300}>Show Me</Text>
                    <Stack mt="sm">
                      <Checkbox
                        color="indigo"
                        label="All"
                        checked={checkedAll}
                        onChange={checkedAll ? undefined : toggleAll}
                      />
                      <Checkbox
                        // disabled={checkedNowPlaying}
                        color="indigo"
                        label="Now Playing"
                        checked={checkedNowPlaying}
                        onChange={
                          checkedNowPlaying ? undefined : toggleNowPlaying
                        }
                      />
                      <Checkbox
                        color="indigo"
                        label="Upcoming"
                        checked={checkedUpcoming}
                        onChange={checkedUpcoming ? undefined : toggleUpcoming}
                      />
                    </Stack>
                  </Box>
                  <Divider my="lg"></Divider>{" "}
                  <Box px="md" pb="xl">
                    <Text fw={300}>Age Ratings</Text>

                    <Checkbox.Group
                      value={certifications}
                      onChange={setCertifications}
                      label=""
                      description=""
                      withAsterisk
                    >
                      <SimpleGrid cols={2} mt="sm">
                        {/* Render the checkboxes for each certification */}

                        <Checkbox color="indigo" value="G" label="G" />
                        <Checkbox color="indigo" value="R" label="R" />
                        <Checkbox color="indigo" value="PG" label="PG" />
                        <Checkbox color="indigo" value="NC-17" label="NC-17" />
                        <Checkbox color="indigo" value="PG-13" label="PG-13" />
                        <Checkbox color="indigo" value="NR" label="NR" />
                      </SimpleGrid>
                    </Checkbox.Group>
                  </Box>
                  <Divider my="lg"></Divider>
                </>
              ) : null}
              <Box px="md">
                {/* Render the KeywordSearch component */}
                <KeywordSearch
                  handleKeywordClick={handleKeywordClick}
                  keywords={state.keywords}
                />
                {/* Render the selected keywords */}
                <Flex mt="sm" gap="sm" wrap="wrap">
                  {state.keywords.map((keyword) => (
                    <Flex
                      py={5}
                      px="xs"
                      bg="brand.7"
                      align="center"
                      key={keyword.id}
                      sx={(theme) => ({
                        borderRadius: theme.radius.sm,
                      })}
                    >
                      <Text fz="sm"> {keyword.name}</Text>{" "}
                      <CloseButton
                        pt={3}
                        size="xs"
                        onClick={() => removeKeyword(keyword.id)}
                      />
                    </Flex>
                  ))}
                </Flex>
              </Box>
              <Divider my="lg"></Divider>
              <Box px="md">
                <Text fw={300}>Release Dates</Text>
                <Flex mt="sm">
                  <Text c="dimmed" fz="sm" w="25%" my="auto">
                    From
                  </Text>
                  <DatePickerInput
                    disabled={!checkedAll}
                    icon={<IconCalendarTime size={16} stroke={1.5} />}
                    defaultLevel="decade"
                    value={state.startDate}
                    onChange={handleStartDateChange}
                    mx="auto"
                    styles={(theme) => ({
                      label: {
                        backgroundColor: theme.colors.brand[8],
                      },
                      markLabel: {
                        fontSize: theme.fontSizes.xs,
                      },
                    })}
                    sx={{
                      flexGrow: 1,
                    }}
                  />
                </Flex>

                <Flex mt="md">
                  <Text c="dimmed" fz="sm" w="25%" my="auto">
                    To
                  </Text>
                  <DatePickerInput
                    disabled={!checkedAll}
                    icon={<IconCalendarTime size={16} stroke={1.5} />}
                    defaultLevel="year"
                    value={state.endDate}
                    onChange={handleEndDateChange}
                    mx="auto"
                    sx={{
                      flexGrow: 1,
                    }}
                  />
                </Flex>
              </Box>
              <Divider my="lg"></Divider>
              <Box px="md" pb="md">
                {" "}
                <Text fw={300}>User Score</Text>
                <Box mb="xl" mt="sm">
                  <RangeSlider
                    thumbSize={12}
                    label={(value) => `${value / 10}`}
                    color="indigo"
                    size="xs"
                    step={10}
                    min={0}
                    max={100}
                    value={scoreValue}
                    onChange={setScoreValue}
                    onChangeEnd={setScoreValue}
                    marks={scoreMarks}
                    styles={(theme) => ({
                      label: {
                        backgroundColor: theme.colors.brand[8],
                      },
                      markLabel: {
                        marginTop: 3,
                        fontSize: theme.fontSizes.xs,
                      },
                    })}
                  />
                </Box>
              </Box>
              {isMovie ? (
                <Box pb="xl">
                  <Divider mb="lg"></Divider>
                  <Box px="md">
                    <Text fw={300}>Runtime</Text>

                    <Box mt="sm">
                      <RangeSlider
                        thumbSize={10}
                        showLabelOnHover
                        label={(value) => `${value} min`}
                        color="indigo"
                        step={25}
                        size="xs"
                        min={50}
                        max={350}
                        value={runtimeValue}
                        onChange={setRuntimeValue}
                        marks={runtimeMarks}
                        styles={(theme) => ({
                          label: {
                            backgroundColor: theme.colors.brand[8],
                          },
                          markLabel: {
                            marginTop: 3,
                            fontSize: theme.fontSizes.xs,
                          },
                        })}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : null}
              <Divider my="lg"></Divider>
              <Box px="md">
                <Text fw={300}>Genres</Text>
                <Flex mt="sm" wrap="wrap" gap="xs">
                  {genresData.map((genre) => (
                    <Button
                      size="xs"
                      radius="xl"
                      key={genre.value}
                      variant={
                        isGenreSelected(genre.value) ? "filled" : "outline"
                      }
                      color={
                        isGenreSelected(genre.value) ? "indigo.6" : "indigo.8"
                      }
                      onClick={() => handleButtonClick(genre.value)}
                    >
                      {genre.label}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>

      <Container fluid size="md" px={desktop ? "xl" : "xs"}>
        <Title size="h2">Discover Movies</Title>
        {isLoading ? (
          <DiscoverGridLoading />
        ) : (
          <DiscoverGrid
            mediaType="movie"
            items={items}
            upcoming={checkedUpcoming}
          />
        )}
      </Container>
    </Flex>
  );
}
