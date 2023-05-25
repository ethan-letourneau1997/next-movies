import { Container } from "@mantine/core";
import Discover from "@/components/Discover/discover";

export default function Popular() {
  return (
    <Container size="xl">
      <Discover type="tv" />
    </Container>
  );
}
