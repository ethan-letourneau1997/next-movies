import { Container } from "@mantine/core";
import Discover from "@/components/Discover/discover";

export default function Popular() {
  return (
    <Container fluid>
      <Discover type="tv" />
    </Container>
  );
}
