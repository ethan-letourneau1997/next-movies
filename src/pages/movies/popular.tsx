import { Container } from "@mantine/core";
import Discover from "@/components/discover";

export default function Popular() {
  return (
    <Container size="xl">
      <Discover type="movie" />
    </Container>
  );
}
