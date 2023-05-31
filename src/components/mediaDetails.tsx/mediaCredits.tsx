import {
  AspectRatio,
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { BsPersonFill } from "react-icons/bs";
import { Credits } from "../../../types";
import Image from "next/image";

export default function MediaCredits(props: { credits: Credits }) {
  const { credits } = props;

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
        <Title size="h3">Top Cast</Title>
      </Group>
      <Grid gutter="lg" pt="sm">
        {credits.cast.slice(0, 9).map((castMember) => (
          <Grid.Col key={castMember.id} span={4}>
            <Flex
              gap="md"
              bg="dark.7"
              // w="95%"
              sx={{
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              {castMember.profile_path ? (
                <Image
                  style={{
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                  }}
                  height={80}
                  width={80}
                  alt=""
                  src={`https://image.tmdb.org/t/p/w470_and_h470_face${castMember.profile_path}`}
                />
              ) : (
                <Box
                  h={80}
                  w={80}
                  bg="brand.4"
                  sx={{
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                  }}
                >
                  <BsPersonFill size={80} color="#18181B" />
                </Box>
              )}
              <Box pt={8}>
                <Text fz="sm" fw={600}>
                  {castMember.name}
                </Text>
                <Text fz="sm">{castMember.character}</Text>
              </Box>
            </Flex>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
