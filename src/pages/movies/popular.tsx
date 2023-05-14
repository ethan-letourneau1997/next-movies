import { Container } from "@mantine/core";
import Discover from "@/components/Discover";

export default function Popular() {
  return (
    <Container size="xl">
      <Discover type="movie" />
    </Container>
  );
}
