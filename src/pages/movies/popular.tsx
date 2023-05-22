import { Container } from "@mantine/core";
import Discover from "@/components/discover";

export default function Popular() {
  return (
    <Container fluid>
      <Discover type="movie" />
    </Container>
  );
}
