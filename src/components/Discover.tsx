import {
  Box,
  Container,
  Grid,
  MultiSelect,
  RangeSlider,
  Select,
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
import MediaGrid from "@/components/mediaGrid";
import { MediaItemTypes } from "../../types";
import { dateToString } from "../../api/format";
import { fetchDiscover } from "../../api/tmdb";
import { type } from "os";
import { useDisclosure } from "@mantine/hooks";

interface DiscoverTypes {
  items: MediaItemTypes[];
  sortBy: string;
  selectedGenres: string[];
  startDate: Date | null;
  endDate: Date;
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

  const [items, setMovies] = useState<MediaItemTypes[]>([]);

  //* Discover state
  const [state, setState] = useState<DiscoverTypes>({
    items: [],
    sortBy: "popularity",
    selectedGenres: [],
    startDate: null,
    endDate: new Date(),
  });

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
      runtimeMax
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
  ]);

  // ! Collapse logic
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Container size="xl">
      <Box>
        <Grid>
          <Grid.Col xl={3}>
            <Select
              label="Sort By"
              defaultChecked
              defaultValue="popularity"
              placeholder="Pick one"
              onChange={(value: string) => handleSortBy(value)}
              data={sortByData}
            />
          </Grid.Col>
          <Grid.Col xl={3}>
            <MultiSelect
              data={genresData}
              label="Genres"
              placeholder="Select genres"
              value={state.selectedGenres}
              onChange={handleGenreChange}
            />
          </Grid.Col>

          <Grid.Col xl={3}>
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
          <Grid.Col xl={3}>
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
          <Grid.Col xl={6}>
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
            <Grid.Col xl={6}>
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
        </Grid>
      </Box>

      <MediaGrid items={items} title="Discover" />
    </Container>
  );
}
