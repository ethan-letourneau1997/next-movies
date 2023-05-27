import {
  Accordion,
  AutocompleteItem,
  Box,
  CloseButton,
  Divider,
  Flex,
  Text,
} from "@mantine/core";
import { MediaItemType, WatchProvider } from "../../../types";
import { movieGenres, sortByData, tvGenres } from "../../../data/discoverData";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

import { BsChevronRight } from "react-icons/bs";
import Checkboxes from "./disoverAccordianComponents/checkBoxes";
import DatePickers from "./disoverAccordianComponents/datePickers";
import Genres from "./disoverAccordianComponents/genres";
import KeywordSearch from "./disoverAccordianComponents/keywordSearch";
import Runtime from "./disoverAccordianComponents/runtime";
import SortBy from "./disoverAccordianComponents/sortBy";
import UserScore from "./disoverAccordianComponents/userScore";
import WhereToWatch from "./disoverAccordianComponents/whereToWatch";
import { dateToString } from "../../pages/api/format";
import { fetchDiscover } from "@/pages/api/dicsover";
import { movieCertifications } from "../../../data/discoverData";

interface DiscoverTypes {
  items: MediaItemType[];
  sortBy: string;
  selectedGenres: (string | AutocompleteItem | null)[];
  startDate: Date | null;
  endDate: Date;
  keywords: AutocompleteItem[];
  type: string;
  setResults: any;
  setLoading: any;
  desktop?: boolean;
}

interface DiscoverPropTypes {
  type: string;
  setResults: any;
  setLoading: any;
  desktop: boolean;
  upcoming: any;
}

export default function Discover({
  type,
  setResults,
  setLoading,
  desktop,
  upcoming,
}: DiscoverPropTypes) {
  // responsive styles

  // loading state
  // const [isLoading, setIsLoading] = useState(true);

  const isMovie = type === "movie";
  const genresData = isMovie ? movieGenres : tvGenres;
  const mediaType = type;

  const [items, setItems] = useState<MediaItemType[]>([]);

  //* Discover state
  const [state, setState] = useState<DiscoverTypes>({
    type: "", // Add the 'type' property with an appropriate type
    setResults: () => {}, // Add the 'setResults' property with an appropriate type
    setLoading: () => {}, // Add the 'setLoading' property with an appropriate type
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
    setLoading(true);
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
        setItems(data);
        setResults(data);
        setLoading(false);
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
    setResults,
    setLoading,
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

  upcoming(checkedUpcoming);

  // filter dropdown state
  const [opened, { toggle }] = useDisclosure(false);

  // height ref for spoiler
  const { ref, width, height } = useElementSize();

  return (
    <>
      <Box
        miw={desktop ? 250 : "90vw"}
        maw={desktop ? 250 : "90vw"}
        mx={desktop ? "md" : 0}
      >
        {desktop != undefined && (
          <Accordion
            variant="separated"
            chevron={<BsChevronRight size={desktop ? 14 : 12} />}
            defaultValue={desktop ? "filters" : ""}
            styles={(theme) => ({
              label: {
                paddingTop: desktop ? "" : 12,
                paddingBottom: desktop ? "" : 12,
                fontSize: desktop ? theme.fontSizes.md : theme.fontSizes.md,
              },
              chevron: {
                "&[data-rotate]": {
                  transform: "rotate(90deg)",
                },
              },
              content: {
                paddingTop: desktop ? "" : 0,
                backgroundColor: theme.colors.dark[8],
                paddingLeft: 0,
                paddingRight: 0,
              },
              control: {
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
                <Divider mb={desktop ? "lg" : "sm"}></Divider>

                <Box px="md">
                  <SortBy
                    handleSortBy={handleSortBy}
                    sortByData={sortByData}
                    desktop={desktop}
                  />
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="where to watch">
              <Accordion.Control px="md">
                <Text fw={500}>Where to Watch</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <WhereToWatch
                  desktop={desktop}
                  handleProviderClick={handleProviderClick}
                  providers={providers}
                  selectedProviders={selectedProviders}
                />
                <Box px="md">
                  <Divider mb="lg"></Divider>

                  <Text fz={desktop ? "md" : "md"} mb={desktop ? "" : "xl"}>
                    Sort results by provider:
                  </Text>
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
                    <Checkboxes
                      desktop={desktop}
                      checkedAll={checkedAll}
                      toggleAll={toggleAll}
                      checkedNowPlaying={checkedNowPlaying}
                      toggleNowPlaying={toggleNowPlaying}
                      checkedUpcoming={checkedUpcoming}
                      toggleUpcoming={toggleUpcoming}
                      certifications={certifications}
                      setCertifications={setCertifications}
                      handleProviderClick={function (value: string): void {
                        throw new Error("Function not implemented.");
                      }}
                      providers={[]}
                    />

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
                <DatePickers
                  desktop={desktop}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                  startDate={state.startDate}
                  endDate={state.endDate}
                  checkedAll={checkedAll}
                />

                <Divider my="lg"></Divider>
                <UserScore
                  desktop={desktop}
                  scoreValue={scoreValue}
                  setScoreValue={setScoreValue}
                />

                {isMovie ? (
                  <Box pb="xl">
                    <Divider mb="lg"></Divider>
                    <Runtime
                      desktop={desktop}
                      runtimeValue={runtimeValue}
                      setRuntimeValue={setRuntimeValue}
                    />
                  </Box>
                ) : null}
                <Divider my="lg"></Divider>

                <Genres
                  mediaType={type}
                  desktop={desktop}
                  handleButtonClick={handleButtonClick}
                  isGenreSelected={isGenreSelected}
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Box>
    </>
  );
}
