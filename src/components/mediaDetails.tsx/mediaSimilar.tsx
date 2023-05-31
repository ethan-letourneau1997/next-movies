import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import Image from "next/image";
import { Similar } from "../../../types";

export default function MediaSimilar(props: { similar: Similar }) {
  const { similar } = props;

  // Sort the similar results by vote_count in descending order
  // similar.results.sort((a, b) => b.vote_count - a.vote_count);

  const theme = useMantineTheme();

  return (
    <Box mt={75}>
      <Group spacing="xs">
        <Divider
          my={6}
          size="sm"
          color={theme.colors.yellow[5]}
          orientation="vertical"
        />
        <Title size="h3">More like this</Title>
      </Group>
      <Grid pt="sm">
        {similar.results &&
          similar.results
            .filter(
              (credit) =>
                credit.original_language === "en" && credit.poster_path
            )
            .slice(0, 6)
            .map((credit) => (
              <Grid.Col key={credit.id} span={2}>
                <AspectRatio
                  ratio={2 / 3}
                  sx={(theme) => ({
                    border: ".5px solid",
                    borderColor: theme.colors.dark[4],
                    borderRadius: "4px",
                    "&:hover": {
                      color: "hsl(45, 97%, 54%)",
                      borderColor: "hsl(45, 97%, 54%)",
                    },
                  })}
                >
                  <Image
                    style={{
                      borderRadius: "4px",
                    }}
                    fill
                    alt=""
                    src={`https://image.tmdb.org/t/p/original${credit.poster_path}`}
                  />
                </AspectRatio>

                {/* <Text c="dark.1" fw="500" truncate fz="sm">
                  {" "}
                  {credit.title || credit.name}
                </Text> */}
              </Grid.Col>
            ))}
      </Grid>
    </Box>
  );
}
