import { AspectRatio, Box, Flex, Image, Text } from "@mantine/core";
import React, { ChangeEvent, useState } from "react";

import { MediaItemType } from "../../types";

interface SearchResult extends MediaItemType {
  title: string;
  name: string;
}

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=0fd7a8764e6522629a3b7e78c452c348&query=${value}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <Box>
        {results.map(
          (item) =>
            (item.poster_path || item.profile_path) && (
              <Flex key={item.id}>
                <Text>{item.title || item.name}</Text>
                <AspectRatio ratio={2 / 3} w={100}>
                  <Image
                    placeholder="blur"
                    src={`https://image.tmdb.org/t/p/w500${
                      item.media_type === "person"
                        ? item.profile_path
                        : item.poster_path
                    }`}
                    alt={item.title}
                  />
                </AspectRatio>
              </Flex>
            )
        )}
      </Box>
    </div>
  );
};

export default Autocomplete;
