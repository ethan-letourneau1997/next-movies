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
import { useStore } from "@/store/store";

function formatReleaseDate(inputDate: string | undefined) {
  if (!inputDate) {
    return ""; // or handle the undefined case in an appropriate way
  }

  const date = new Date(inputDate);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default function DiscoverGrid(props: {
  mediaType: string;
  items: MediaItemType[];
  upcoming: boolean;
}) {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");
  const items = props.items;

  const showMeValue = useStore((state) => state.showMeValue);

  return (
    <Box mt="xl">
      <Grid gutter="xl" maw="100%">
        {items.map((item, index) => (
          <Grid.Col span={12} lg={6} key={item.id}>
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
                    }}
                    alt="poster"
                    src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                  />
                </AspectRatio>
              </Grid.Col>
              <Grid.Col span="auto">
                <Stack spacing={0}>
                  <Title fw={600} size={desktop ? "h4" : "h4"} order={2}>
                    {item.title || item.name}
                  </Title>

                  <Flex align="center" gap={10} mt={2}>
                    {showMeValue === "upcoming" ? null : (
                      <Flex gap={10}>
                        {item.vote_average !== undefined &&
                          item.vote_average > 0 && (
                            <Flex align="center" gap={3}>
                              <BsFillStarFill
                                size={desktop ? 14 : 12}
                                color="#fcc419"
                              />

                              <Text fz={desktop ? "sm" : "sm"} fw={600}>
                                {item.vote_average}
                              </Text>
                            </Flex>
                          )}

                        <Text c="brand.4" fw={500} fz={desktop ? "sm" : "sm"}>
                          {item.release_date?.substring(0, 4) ||
                            item.first_air_date?.substring(0, 4)}
                          {props.mediaType === "tv" && item.lastAirDate
                            ? `-${item.lastAirDate.substring(0, 4)}`
                            : null}
                        </Text>
                      </Flex>
                    )}

                    <Text c="brand.4" fw={500} fz={desktop ? "sm" : "sm"}>
                      {formatReleaseDate(item.release_date)}
                    </Text>

                    <Text c="brand.4" fw={500} fz={desktop ? "sm" : "sm"}>
                      {item.runtimeOrEpisodeLength}
                    </Text>

                    {item.certification && (
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
                    )}
                  </Flex>

                  {showMeValue === "upcoming" ? (
                    <Flex gap={6}>
                      {/* <Text fw={500} fz="sm">
                        In Theatres:
                      </Text> */}
                      {/* <Text fw={500} c="brand.4" fz="sm">
                        {formatReleaseDate(item.release_date)}
                      </Text> */}
                    </Flex>
                  ) : null}
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
