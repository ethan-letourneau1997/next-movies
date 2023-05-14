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

export default function MediaGrid(props: {
  items: MediaItemTypes[];
  title: string;
}) {
  const items = props.items;

  return (
    <Box>
      <Title>{props.title}</Title>
      <SimpleGrid cols={6} mt="xl">
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
    </Box>
  );
}
