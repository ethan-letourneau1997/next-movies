import { Grid } from "@mantine/core";
import { Similar } from "../../../types";

export default function MediaSimilar(props: { similar: Similar }) {
  const { similar } = props;
  return (
    <div>
      <h1>Similar</h1>
      <Grid>
        {similar.results &&
          similar.results.map((credit) => (
            <Grid.Col key={credit.id} span={2}>
              {credit.title}
              {credit.name}
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
}
