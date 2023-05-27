import { Container, Flex, Text, Title } from "@mantine/core";

import Discover from "../discover";
import DiscoverGrid from "../discoverGrid";
import DiscoverGridLoading from "../discoverGridLoading";
import { MediaItemType } from "../../../../types";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

export default function DiscoverLayout(props: { type: string }) {
  const [results, setResults] = useState<MediaItemType[]>([]);

  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // upcoming title state
  const [upcoming, setUpcoming] = useState(true);

  return (
    <div>
      <Flex mt="xl" direction={desktop ? "row" : "column"}>
        <Discover
          type={props.type}
          setResults={setResults}
          setLoading={setIsLoading}
          desktop={desktop}
          upcoming={setUpcoming}
        />

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
                upcoming={upcoming}
              />
              {results.length === 0 ? <Text>No results to display</Text> : null}
            </>
          )}
        </Container>
      </Flex>
    </div>
  );
}
