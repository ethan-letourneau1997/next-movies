import { Credits } from "../../../types";
import { Grid } from "@mantine/core";

export default function MediaCredits(props: { credits: Credits }) {
  const { credits } = props;
  return (
    <div>
      <h1>Top Cast</h1>
      <Grid>
        {credits.cast.map((castMember) => (
          <Grid.Col key={castMember.id} span={2}>
            {castMember.name}
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
