import {
  AspectRatio,
  Box,
  Container,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
};

export default function MediaGrid(props: { items: Movie[] }) {
  const items = props.items;

  return (
    <Container size="xl">
      <Title>Trending</Title>
      <SimpleGrid cols={6}>
        {items.map((item) => (
          <Box key={item.id}>
            <AspectRatio ratio={2 / 3}>
              <Skeleton visible></Skeleton>
              <Image
                placeholder="blur"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
            </AspectRatio>
            <Text>{item.title}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
