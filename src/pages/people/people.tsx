import {
  AspectRatio,
  Center,
  Container,
  Grid,
  Image,
  Skeleton,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import Link from "next/link";
import { MediaItemType } from "../../../types";
import { fetchTrending } from "../api/tmdb";
import { movieGenres } from "../../../data/discoverData";

export default function People() {
  const mediaType = "person";

  const [people, setPeople] = useState<MediaItemType[]>([]);

  useEffect(() => {
    fetchTrending(mediaType)
      .then((data) => {
        setPeople(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(people);

  return (
    <Container size="xl">
      <Title>People</Title>
      <Grid>
        {people.map((person) => (
          <Grid.Col span={2} key={person.id}>
            <Link href={`/people/${person.id}-${person.name}`}>
              <AspectRatio ratio={2 / 3}>
                <Skeleton visible></Skeleton>
                <Image
                  placeholder="blur"
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                />
              </AspectRatio>
            </Link>
            <h3>{person.name}</h3>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
