import {
  Anchor,
  BackgroundImage,
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Image,
  Overlay,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { use, useEffect, useState } from "react";
import {
  fetchNowPlaying,
  fetchTopMovies,
  fetchTopTV,
  fetchTrendingItems,
  fetchUpcomingMovies,
} from "./api/homeApi";

import { AspectRatio } from "@mantine/core";
import HomeGrid from "@/components/home/homeGrid";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { MediaItemType } from "../../types";
import styles from "@/styles/Home.module.css";

const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

export default function Home() {
  const [trendingItems, setTrendingItems] = useState<MediaItemType[]>([]);

  useEffect(() => {
    fetchTrendingItems().then((items) => {
      setTrendingItems(items);
    });
  }, []);

  return (
    <Box>
      <HomeGrid />
      <Box
        mt="xl"
        sx={{
          height: "fit-content",
        }}
      >
        {" "}
        <Title px="xl" size="h3" fw={700}>
          Trending Today
        </Title>
        <Box mt="xl">
          <Marquee speed={25}>
            {trendingItems &&
              trendingItems.map((item) => (
                <Box
                  key={item.id}
                  px="sm"
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  <Skeleton visible></Skeleton>
                  <Anchor
                    href={`/${item.title ? "movies" : "shows"}/${item.id}/${
                      item.title ? item.title : item.name
                    }`}
                    component={Link}
                  >
                    <Image
                      radius="sm"
                      height={250}
                      placeholder="blur"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                      sx={{
                        transition: "transform .2s",
                        "&:hover": {
                          transform: " scale(1.05)",
                        },
                      }}
                    />
                  </Anchor>
                </Box>
              ))}
          </Marquee>
        </Box>
      </Box>
    </Box>
  );
}
