import {
  AutocompleteItem,
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  Flex,
  Grid,
  MultiSelect,
  Paper,
  RangeSlider,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  movieGenres,
  runtimeMarks,
  scoreMarks,
  sortByData,
  tvGenres,
} from "../../data/discoverData";
import { useEffect, useState } from "react";

import { DatePickerInput } from "@mantine/dates";
import { IconCalendarTime } from "@tabler/icons-react";
import KeywordSearch from "./tvComponents/keywords/keywordSearch";
import MediaGrid from "@/components/mediaGrid";
import { MediaItemType } from "../../types";
import { dateToString } from "../pages/api/format";
import { fetchDiscover } from "../pages/api/tmdb";
import { useDisclosure } from "@mantine/hooks";

interface DiscoverTypes {
  items: MediaItemType[];
  sortBy: string;
  selectedGenres: (string | AutocompleteItem | null)[];
  startDate: Date | null;
  endDate: Date;
  keywords: AutocompleteItem[];
}

interface Keyword {
  id: number;
  name: string;
}

export default function Discover(props: { type: string }) {
  let isMovie;
  {
    props.type === "movie" ? (isMovie = true) : (isMovie = false);
  }
  const mediaType = props.type;

  let genresData;
  {
    isMovie ? (genresData = movieGenres) : (genresData = tvGenres);
  }

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

  console.log(state);

  //*Discover functions
  const handleSortBy = (value: string) => {
    setState((prevState) => ({ ...prevState, sortBy: value }));
  };

  const handleGenreChange = (values: string[]) => {
    setState((prevState) => ({ ...prevState, selectedGenres: values }));
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

  // const handleKeywordClick = (item: AutocompleteItem): void => {
  //   const keyword = item;
  //   setKeywords((prevKeywords) => [...prevKeywords, keyword]);
  // };

  // * --------------- Genres ----------------------

  const selectedGenresArray = genresData.filter((genre) =>
    state.selectedGenres.includes(genre.value)
  );
  const selectedGenresString = selectedGenresArray
    .map((genre) => genre.value)
    .join(", ");

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

  // * API calls
  useEffect(() => {
    fetchDiscover(
      mediaType,
      state.sortBy,
      state.selectedGenres.join(", "),
      dateToString(state.startDate),
      dateToString(state.endDate),
      bottomScore,
      topScore,
      runtimeMin,
      runtimeMax,
      keywordString
    )
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    state,
    selectedGenresString,
    bottomScore,
    topScore,
    runtimeMin,
    runtimeMax,
    mediaType,
    keywordString,
  ]);

  // ! Collapse logic
  const [opened, { toggle }] = useDisclosure(false);

  // ! Autocomplete logic
  const [keywords, setKeywords] = useState<AutocompleteItem[]>([]);

  return (
    <Flex>
      <Box
        miw={250}
        maw={250}
        // bg="red"
      >
        <Select
          label="Sort By"
          defaultChecked
          defaultValue="popularity"
          placeholder="Pick one"
          onChange={(value: string) => handleSortBy(value)}
          data={sortByData}
        />
        <Box mt="xl">
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
      </Box>
      {/* <Grid>
        <Grid.Col xl={12}>
          <Select
            label="Sort By"
            defaultChecked
            defaultValue="popularity"
            placeholder="Pick one"
            onChange={(value: string) => handleSortBy(value)}
            data={sortByData}
          />
        </Grid.Col>
        <Grid.Col xl={12}>
          <MultiSelect
            data={genresData}
            label="Genres"
            placeholder="Select genres"
            value={state.selectedGenres}
            onChange={handleGenreChange}
          />
        </Grid.Col>
        <Grid.Col xl={12}>
          <Text w="25%">From</Text>
          <DatePickerInput
            icon={<IconCalendarTime size="1.1rem" stroke={1.5} />}
            defaultLevel="decade"
            value={state.startDate}
            onChange={handleStartDateChange}
            mx="auto"
            sx={{
              flexGrow: 1,
            }}
          />
        </Grid.Col>
        <Grid.Col xl={12}>
          <Text w="25%">To</Text>
          <DatePickerInput
            icon={<IconCalendarTime size="1.1rem" stroke={1.5} />}
            defaultLevel="year"
            value={state.endDate}
            onChange={handleEndDateChange}
            mx="auto"
            sx={{
              flexGrow: 1,
            }}
          />
        </Grid.Col>
        <Grid.Col xl={12}>
          <Box>
            <Text fz="sm" ta="center">
              User Score
            </Text>
          </Box>
          <Box w="90%" mx="auto" mb="xl">
            <RangeSlider
              label={null}
              step={10}
              min={0}
              max={100}
              value={scoreValue}
              onChange={setScoreValue}
              onChangeEnd={setScoreValue}
              marks={scoreMarks}
            />
          </Box>
        </Grid.Col>
        {isMovie ? (
          <Grid.Col xl={12}>
            <Box>
              <Text fz="sm" ta="center">
                Runtime
              </Text>
            </Box>
            <Box w="90%" mx="auto" mb="xl">
              <RangeSlider
                label={null}
                step={25}
                min={25}
                max={400}
                value={runtimeValue}
                onChange={setRuntimeValue}
                marks={runtimeMarks}
              />
            </Box>
          </Grid.Col>
        ) : null}
      </Grid> */}
      <Container fluid size="md">
        <Box></Box>
        <MediaGrid items={items} title="Discover" />
      </Container>
    </Flex>
  );
}
