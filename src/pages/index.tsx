import {
  Anchor,
  Autocomplete,
  Box,
  Container,
  Image,
  Skeleton,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

import HomeGrid from "@/components/home/homeGrid";
import KeywordSearch from "@/components/tvComponents/keywords/keywordSearch";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { MediaItemType } from "../../types";
import { fetchTrendingItems } from "./api/homeApi";

const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

interface Keyword {
  id: number;
  name: string;
}

export default function Home() {
  const [trendingItems, setTrendingItems] = useState<MediaItemType[]>([]);

  // useEffect(() => {
  //   fetchTrendingItems().then((items) => {
  //     setTrendingItems(items);
  //   });
  // }, []);

  return (
    <Box>
      {/* <Autocomplete data={results} /> */}

      {/* <HomeGrid />
      <Box
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
      </Box> */}
    </Box>
  );
}
