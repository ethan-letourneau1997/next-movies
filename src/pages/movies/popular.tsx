import { Container } from "@mantine/core";
import Discover from "@/components/Discover/discover";
import DiscoverLayout from "@/components/Discover/disoverAccordianComponents/discoverLayout";

export default function Popular() {
  return (
    <Container fluid>
      <DiscoverLayout type="movie" />
    </Container>
  );
}
