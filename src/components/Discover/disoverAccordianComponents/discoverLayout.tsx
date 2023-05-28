import { Container, Flex, Text, Title } from "@mantine/core";

import Discover from "../discover";
import DiscoverGrid from "../discoverGrid";
import DiscoverGridLoading from "../discoverGridLoading";
import { MediaItemType } from "../../../../types";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

interface DiscoverLayoutProps {
  type: string;
}

export default function DiscoverLayout({ type }: DiscoverLayoutProps) {
  const [results, setResults] = useState<MediaItemType[]>([]);

  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // upcoming title state

  return (
    <div>
      <Flex mt="xl" direction={desktop ? "row" : "column"}>
        <Discover
          type={type}
          setResults={setResults}
          setLoading={setIsLoading}
          desktop={desktop}
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
                upcoming={false}
              />
              {results.length === 0 ? <Text>No results to display</Text> : null}
            </>
          )}
        </Container>
      </Flex>
    </div>
  );
}
