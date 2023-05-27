import { Box, Button, Flex, Text } from "@mantine/core";
import { movieGenres, tvGenres } from "../../../../data/discoverData";

interface GenresType {
  desktop: boolean;
  isGenreSelected: (value: string) => boolean;
  handleButtonClick: (value: string) => void;
  mediaType: string;
}

export default function Genres({
  desktop,
  isGenreSelected,
  handleButtonClick,
  mediaType,
}: GenresType) {
  const isMovie = mediaType === "movie";
  const genresData = isMovie ? movieGenres : tvGenres;

  return (
    <Box px="md">
      <Text fw={desktop ? 300 : 500} fz={desktop ? "md" : "md"}>
        Genres
      </Text>
      <Flex mt="sm" wrap="wrap" gap="xs">
        {genresData.map((genre) => (
          <Button
            size="xs"
            radius="xl"
            key={genre.value}
            variant={isGenreSelected(genre.value) ? "filled" : "outline"}
            color={isGenreSelected(genre.value) ? "indigo.6" : "indigo.8"}
            onClick={() => handleButtonClick(genre.value)}
          >
            {genre.label}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
