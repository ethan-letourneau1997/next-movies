import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { BsFillPlayFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { MediaItemType } from "../../../types";
import styles from "@/styles/Burger.module.css";
import { useDisclosure } from "@mantine/hooks";

interface mediaProps {
  mediaDetails: MediaItemType;
}

export default function Trailer({ mediaDetails }: mediaProps) {
  const trailers = mediaDetails.videos.results.filter(
    (video) => video.type === "Trailer"
  );

  const theme = useMantineTheme();

  console.log(mediaDetails);

  const trailer = trailers[0];

  let videoUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`;

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      {" "}
      <Modal
        opened={opened}
        onClose={close}
        // withCloseButton={false}
        title={`${mediaDetails.name || mediaDetails.title} Official Trailer`}
        p={0}
        size="80%"
        withOverlay
        styles={(theme) => ({
          body: {
            padding: 0,
          },
          header: {
            backgroundColor: theme.colors.dark[7],
          },
        })}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.9,
          blur: 3,
        }}
      >
        <Box>
          {mediaDetails.videos.results &&
            mediaDetails.videos.results
              .filter((video) => video.type === "Trailer")
              .slice(0, 1)
              .map((video) => (
                <Box key={video.id}>
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      id="ytplayer"
                      frameBorder="0"
                      allowFullScreen
                      src={videoUrl}
                    ></iframe>
                  </AspectRatio>
                </Box>
              ))}
        </Box>
      </Modal>
      <Button onClick={open} fullWidth leftIcon={<FaPlay />} mt="md">
        Watch Trailer{" "}
      </Button>
    </Box>
  );
}
