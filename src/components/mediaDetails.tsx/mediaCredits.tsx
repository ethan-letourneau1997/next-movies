import {
  AspectRatio,
  Avatar,
  Box,
  Container,
  Flex,
  Grid,
  Text,
  Title,
} from "@mantine/core";

import { BsPersonFill } from "react-icons/bs";
import { Credits } from "../../../types";
import Image from "next/image";

export default function MediaCredits(props: { credits: Credits }) {
  const { credits } = props;
  return (
    <Container mt="xl" px="xl">
      <Title px="xl" size="h3">
        Top Cast
      </Title>
      <Grid mt="md" px="xl" gutter="lg">
        {credits.cast.slice(0, 9).map((castMember) => (
          <Grid.Col key={castMember.id} span={4}>
            <Flex gap="md" bg="dark.7" w="95%">
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
    </Container>
  );
}
