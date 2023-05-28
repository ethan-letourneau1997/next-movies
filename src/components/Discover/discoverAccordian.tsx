import { Accordion, AutocompleteItem, Box, Divider, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { BsChevronRight } from "react-icons/bs";
import DatePickers from "./disoverAccordianComponents/datePickers";
import Genres from "./disoverAccordianComponents/genreToggles";
import Keywords from "./disoverAccordianComponents/keywordAutocomplete";
import { MediaItemType } from "../../../types";
import Runtime from "./disoverAccordianComponents/runtimeSlider";
import { ShowMe } from "./disoverAccordianComponents/showMeRadio";
import SortBy from "./disoverAccordianComponents/sortBySelect";
import UserScore from "./disoverAccordianComponents/userScoreSlider";
import WhereToWatch from "./disoverAccordianComponents/whereToWatch";
import { dateToString } from "../../pages/api/format";
import { fetchDiscover } from "@/pages/api/dicsoverAPI";
import { movieCertifications } from "../../../data/discoverData";
import { useStore } from "@/store/store";

interface DiscoverPropTypes {
  type: string;

  desktop: boolean;
}

export default function Discover({
  type,

  desktop,
}: DiscoverPropTypes) {
  const isMovie = type === "movie";

  const mediaType = type;

  const [items, setItems] = useState<MediaItemType[]>([]);

  // * --------------- Certifications (MPAA ratings) ----------------------

  // const [certifications, setCertifications] =
  //   useState<string[]>(movieCertifications);

  // const certificationString = certifications
  //   .map((certification) => certification)
  //   .join("|");

  // // * --------------- retrieve states from useStore ----------------------

  // const startDate = useStore((state) => state.startDate);
  // const endDate = useStore((state) => state.endDate);
  // const genres = useStore((state) => state.genres);
  // const keywords = useStore((state) => state.keywordString);
  // const sortBy = useStore((state) => state.sortBy);
  // const providersString = useStore((state) => state.selectedProvidersString);
  // const scoreSliderValue = useStore((state) => state.scoreSliderValue);
  // const runtimeSliderValue = useStore((state) => state.runtimeSliderValue);

  // // * API calls
  // useEffect(() => {
  //   setLoading(true);
  //   fetchDiscover(
  //     mediaType,
  //     sortBy,
  //     genres.map((genre) => genre).join(", "),
  //     dateToString(startDate),
  //     dateToString(endDate),
  //     (scoreSliderValue[0] / 10).toString(),
  //     (scoreSliderValue[1] / 10).toString(),
  //     runtimeSliderValue[0].toString(),
  //     runtimeSliderValue[1].toString(),
  //     keywords,
  //     providersString,
  //     certificationString
  //   )
  //     .then((data) => {
  //       setItems(data);
  //       setResults(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [
  //   mediaType,

  //   certificationString,
  //   setResults,
  //   setLoading,
  //   startDate,
  //   endDate,
  //   genres,
  //   keywords,
  //   sortBy,
  //   providersString,
  //   scoreSliderValue,
  //   runtimeSliderValue,
  // ]);

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
                <Divider mb="lg" />
                <Box px="md">
                  <WhereToWatch desktop={desktop} />
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
                      <ShowMe />
                    </Box>

                    <Divider my="lg"></Divider>
                  </>
                ) : null}

                <Box px="md">
                  <Keywords />
                </Box>
                <Divider my="lg"></Divider>

                <Box px="md">
                  <DatePickers desktop={desktop} />
                </Box>

                <Divider my="lg"></Divider>
                <Box px="md">
                  <UserScore desktop={desktop} />
                </Box>

                {isMovie ? (
                  <Box pb="xl">
                    <Divider mb="lg"></Divider>
                    <Box px="md">
                      <Runtime desktop={desktop} />
                    </Box>
                  </Box>
                ) : null}
                <Divider my="lg"></Divider>

                <Box px="md">
                  <Genres mediaType={type} desktop={desktop} />
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Box>
    </>
  );
}
