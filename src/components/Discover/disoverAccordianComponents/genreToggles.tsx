import { Box, Button, Flex, Text } from "@mantine/core";
import { movieGenres, tvGenres } from "../../../../data/discoverData";

import { useStore } from "@/store/store";

interface GenresType {
  desktop: boolean;

  mediaType: string;
}

export default function Genres({
  desktop,

  mediaType,
}: GenresType) {
  const isMovie = mediaType === "movie";
  const genresData = isMovie ? movieGenres : tvGenres;

  const [genres, updateGenres] = useStore((state) => [
    state.genres,
    state.updateGenres,
  ]);

  const isGenreSelected = (genreId: string) => genres.includes(genreId);

  return (
    <Box>
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
            onClick={() => updateGenres(genre.value)}
          >
            {genre.label}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
