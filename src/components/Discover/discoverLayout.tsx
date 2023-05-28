import {
  Button,
  Container,
  Flex,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import Discover from "./discoverAccordian";
import DiscoverGrid from "./discoverGrid";
import DiscoverGridLoading from "./discoverGridLoading";
import { MediaItemType } from "../../../types";
import { dateToString } from "@/pages/api/format";
import { fetchDiscover } from "@/pages/api/dicsoverAPI";
import { movieCertifications } from "../../../data/discoverData";
import { useMediaQuery } from "@mantine/hooks";
import { useStore } from "@/store/store";

interface DiscoverLayoutProps {
  type: string;
}

export default function DiscoverLayout({ type }: DiscoverLayoutProps) {
  const [results, setResults] = useState<MediaItemType[]>([]);

  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // Page number
  const [activePage, setPage] = useState(1);

  // * --------------- retrieve states from useStore ----------------------

  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);
  const genres = useStore((state) => state.genres);
  const keywords = useStore((state) => state.keywordString);
  const sortBy = useStore((state) => state.sortBy);
  const providersString = useStore((state) => state.selectedProvidersString);
  const scoreSliderValue = useStore((state) => state.scoreSliderValue);
  const runtimeSliderValue = useStore((state) => state.runtimeSliderValue);

  // * --------------- Certifications (MPAA ratings) ----------------------

  const [certifications, setCertifications] =
    useState<string[]>(movieCertifications);

  const certificationString = certifications
    .map((certification) => certification)
    .join("|");

  // * API calls
  useEffect(() => {
    setIsLoading(true);
    fetchDiscover(
      type,
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
      certificationString,
      activePage
    )
      .then((data) => {
        setResults(data);
        setResults(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    type,

    certificationString,
    setResults,
    setIsLoading,
    startDate,
    endDate,
    genres,
    keywords,
    sortBy,
    providersString,
    scoreSliderValue,
    runtimeSliderValue,
    activePage,
  ]);

  return (
    <div>
      <Flex mt="xl" direction={desktop ? "row" : "column"}>
        <Discover type={type} desktop={desktop} />
        <Container
          mt={desktop ? 0 : "xl"}
          fluid
          size="md"
          px={desktop ? "xl" : "xs"}
          sx={{
            flexGrow: 1,
          }}
        >
          <Title size="h2">Discover Movies</Title>
          {isLoading ? (
            <DiscoverGridLoading />
          ) : (
            <>
              <DiscoverGrid
                mediaType="movie"
                items={results}
                upcoming={false}
              />
              {results.length === 0 ? <Text>No results to display</Text> : null}
              <>
                {/* <Pagination
                  total={20}
                  siblings={1}
                  value={activePage}
                  onChange={setPage}
                /> */}
              </>
            </>
          )}
        </Container>
      </Flex>
    </div>
  );
}
