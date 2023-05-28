import { Accordion, AutocompleteItem, Box, Divider, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { BsChevronRight } from "react-icons/bs";
import DatePickers from "./disoverAccordianComponents/datePickers";
import Genres from "./disoverAccordianComponents/genres";
import Keywords from "./disoverAccordianComponents/keyword";
import { MediaItemType } from "../../../types";
import Runtime from "./disoverAccordianComponents/runtime";
import { ShowMe } from "./showMe";
import SortBy from "./disoverAccordianComponents/sortBy";
import UserScore from "./disoverAccordianComponents/userScore";
import WhereToWatch from "./disoverAccordianComponents/whereToWatch";
import { dateToString } from "../../pages/api/format";
import { fetchDiscover } from "@/pages/api/dicsoverAPI";
import { movieCertifications } from "../../../data/discoverData";
import { useStore } from "@/store/store";

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
}

export default function Discover({
  type,
  setResults,
  setLoading,
  desktop,
}: DiscoverPropTypes) {
  const isMovie = type === "movie";

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

  // * --------------- Certifications (MPAA ratings) ----------------------

  const [certifications, setCertifications] =
    useState<string[]>(movieCertifications);

  const certificationString = certifications
    .map((certification) => certification)
    .join("|");

  // * --------------- retrieve states from useStore ----------------------

  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);
  const genres = useStore((state) => state.genres);
  const keywords = useStore((state) => state.keywordString);
  const sortBy = useStore((state) => state.sortBy);
  const providersString = useStore((state) => state.selectedProvidersString);
  const scoreSliderValue = useStore((state) => state.scoreSliderValue);
  const runtimeSliderValue = useStore((state) => state.runtimeSliderValue);

  // * API calls
  useEffect(() => {
    setLoading(true);
    fetchDiscover(
      mediaType,
      sortBy,
      genres.map((genre) => genre).join(", "),
      dateToString(startDate),
      dateToString(endDate),
      (scoreSliderValue[0] / 10).toString(),
      (scoreSliderValue[1] / 10).toString(),
      runtimeSliderValue[0].toString(),
      runtimeSliderValue[1].toString(),
      keywords,
      providersString,
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

    mediaType,

    certificationString,
    setResults,
    setLoading,
    startDate,
    endDate,
    genres,
    keywords,
    sortBy,
    providersString,
    scoreSliderValue,
    runtimeSliderValue,
  ]);

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
                  <SortBy desktop={desktop} />
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="where to watch">
              <Accordion.Control px="md">
                <Text fw={500}>Where to Watch</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <WhereToWatch desktop={desktop} />
                <Box px="md">
                  <Divider mb="lg"></Divider>
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
                    <ShowMe />
                    <Divider my="lg"></Divider>
                  </>
                ) : null}

                <Box px="md">
                  <Keywords />
                </Box>
                <Divider my="lg"></Divider>
                <DatePickers desktop={desktop} />

                <Divider my="lg"></Divider>
                <UserScore desktop={desktop} />

                {isMovie ? (
                  <Box pb="xl">
                    <Divider mb="lg"></Divider>
                    <Runtime desktop={desktop} />
                  </Box>
                ) : null}
                <Divider my="lg"></Divider>

                <Genres mediaType={type} desktop={desktop} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Box>
    </>
  );
}
