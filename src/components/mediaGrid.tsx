import {
  AspectRatio,
  Box,
  Container,
  Image,
  SimpleGrid,
  Skeleton,
  Title,
} from "@mantine/core";

import Link from "next/link";
import { MediaItemTypes } from "../../types";

export default function MediaGrid(props: { items: MediaItemTypes[] }) {
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
            <Link
              // href={`/movies/${item.id}-${encodeURIComponent(
              //   item.title ?? item.name ?? ""
              // )}`}
              href={`/${item.title ? "movies" : "tv"}/${item.id}-${
                item.title ? item.title : item.name
              }`}
            >
              {item.title ? item.title : item.name}
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
