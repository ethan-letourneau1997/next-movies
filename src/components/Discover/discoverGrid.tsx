import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Grid,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { BsFillStarFill } from "react-icons/bs";
import Image from "next/image";
import { MediaItemType } from "../../../types";
import { useMediaQuery } from "@mantine/hooks";

export default function DiscoverGrid(props: {
  mediaType: string;
  items: MediaItemType[];
  upcoming: boolean;
}) {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");
  const items = props.items;

  return (
    <Box mt="xl">
      <Grid gutter="xl">
        {items.map((item, index) => (
          <Grid.Col span={12} md={6} key={item.id}>
            <Grid
              gutter="md"
              // bg="hsl(240, 10%, 7%)"
              sx={{
                borderRadius: "4px",
              }}
            >
              <Grid.Col span="content">
                <AspectRatio ratio={2 / 3} miw={desktop ? 100 : 80}>
                  <Image
                    fill
                    style={{
                      borderRadius: "4px",
                      // border: "1px solid hsla(0, 0%, 30%, .25)",
                    }}
                    alt="poster"
                    src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                  />
                </AspectRatio>
              </Grid.Col>
              <Grid.Col span="auto">
                <Stack spacing={0}>
                  <Title size={desktop ? "h4" : "h5"} order={2}>
                    {item.title || item.name}
                  </Title>

                  <Flex align="center" gap={8} mt={2}>
                    {props.upcoming ? null : (
                      <Flex align="center" gap={3}>
                        <BsFillStarFill
                          size={desktop ? 14 : 12}
                          color="#ffd452"
                        />

                        <Text fz={desktop ? "sm" : "xs"} fw={600}>
                          {item.vote_average}
                        </Text>
                      </Flex>
                    )}
                    {item.certification && (
                      <Text
                        sx={(theme) => ({
                          // border: "1.3px solid #585757",
                          // paddingLeft: 6,
                          // paddingRight: 6,
                        })}
                        c="brand.4"
                        fw={600}
                        fz={desktop ? 10 : "xs"}
                      >
                        {item.certification}
                      </Text>
                    )}
                    <Text c="brand.4" fw={500} fz={desktop ? "sm" : "xs"}>
                      {item.release_date?.substring(0, 4) ||
                        item.first_air_date?.substring(0, 4)}
                      {props.mediaType === "tv" && item.lastAirDate
                        ? `-${item.lastAirDate.substring(0, 4)}`
                        : null}
                    </Text>

                    <Text c="brand.4" fw={500} fz={desktop ? "sm" : "xs"}>
                      {item.runtimeOrEpisodeLength}
                    </Text>
                    {/* {item.certification && (
                      <Text
                        sx={(theme) => ({
                          border: "1.3px solid #585757",
                          paddingLeft: 6,
                          paddingRight: 6,
                        })}
                        c="brand.4"
                        fw={500}
                        fz={desktop ? 10 : 10}
                      >
                        {item.certification}
                      </Text>
                    )} */}
                  </Flex>
                  <Spoiler
                    mt={desktop ? "md" : 6}
                    fz={desktop ? "sm" : "xs"}
                    maxHeight={desktop ? 46 : 40}
                    showLabel="Read More"
                    hideLabel="Read Less"
                  >
                    <Text fz={desktop ? "sm" : "xs"}> {item.overview}</Text>
                  </Spoiler>
                </Stack>
              </Grid.Col>
            </Grid>
            <Divider my="sm" color="hsla(0, 0%, 20%, .5)" />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
