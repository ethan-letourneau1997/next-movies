import {
  AspectRatio,
  Box,
  Button,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { MediaItemType, Video } from "../../../types";

import { BsFillPlayFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";

interface trailerProps {
  trailer: Video;
}

export default function Trailer({ trailer }: trailerProps) {
  const theme = useMantineTheme();

  let videoUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`;

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      {" "}
      <Modal
        opened={opened}
        onClose={close}
        // withCloseButton={false}
        title={`${trailer.name || trailer.title} Official Trailer`}
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
          <Box>
            <AspectRatio ratio={16 / 9}>
              <iframe
                id="ytplayer"
                frameBorder="0"
                allowFullScreen
                src={videoUrl}
              ></iframe>
            </AspectRatio>
          </Box>
        </Box>
      </Modal>
      <Button onClick={open} fullWidth leftIcon={<FaPlay />} mt="md">
        Watch Trailer{" "}
      </Button>
    </Box>
  );
}
