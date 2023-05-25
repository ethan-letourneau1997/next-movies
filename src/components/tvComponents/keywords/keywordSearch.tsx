import { Autocomplete, AutocompleteItem, Box, Container } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface KeywordSearchProps {
  handleKeywordClick: (item: AutocompleteItem) => void;
  keywords: AutocompleteItem[];
}

export default function KeywordSearch(props: KeywordSearchProps): JSX.Element {
  const { handleKeywordClick, keywords } = props;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<AutocompleteItem[]>([]);
  //   const [searchTerm, setSearchTerm] = useState<string>("");
  //   const [results, setResults] = useState<AutocompleteItem[]>([]);
  //   const [keywords, setKeywords] = useState<AutocompleteItem[]>([]);

  const keywordSearch: string = keywords.map((keyword) => keyword.id).join("|");

  useEffect(() => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQ3YTg3NjRlNjUyMjYyOWEzYjdlNzhjNDUyYzM0OCIsInN1YiI6IjY0MDE0MmY4YzcxNzZkMDA5ZDZmMjM5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVopQkVmwaUxWoFjisYglulnsEZvcy9cwHEKA1CFJC4",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/keyword?query=${searchTerm}&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const renamedResults: AutocompleteItem[] = response.results.map(
          (result: AutocompleteItem) => ({
            ...result,
            value: result.name,
          })
        );

        // Filter out results with the same ID as an object in the keywords array
        const filteredResults: AutocompleteItem[] = renamedResults.filter(
          (result) => !keywords.some((keyword) => keyword.id === result.id)
        );

        setResults(filteredResults);
      })
      .catch((err) => console.error(err));
  }, [searchTerm, keywords]);

  //   const handleKeywordClick = (item: AutocompleteItem): void => {
  //     const keyword = item;
  //     setKeywords((prevKeywords) => [...prevKeywords, keyword]);
  //     setSearchTerm("");
  //   };

  const handleSelect = (item: AutocompleteItem): void => {
    handleKeywordClick(item);
    setSearchTerm("");
  };

  return (
    <Autocomplete
      label="Keywords"
      data={results}
      placeholder="Search keywords"
      onChange={setSearchTerm}
      onItemSubmit={handleSelect}
      value={searchTerm}
      styles={(theme) => ({
        label: {
          marginBottom: theme.spacing.xs,

          fontSize: theme.fontSizes.md,
          fontWeight: 300,
        },
      })}
    />
  );
}
