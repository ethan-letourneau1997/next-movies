import { AspectRatio, BackgroundImage, Box, Group } from "@mantine/core";

import { MediaItemType } from "../../../types";

interface BannerImageProps {
  items: MediaItemType;
}

export default function BannerImage({ items }: BannerImageProps) {
  return (
    <Box>
      {/* <Box pos="relative">
      <Box
        pos="relative"
        bottom={-10}
        w="100%"
        h={10}
        sx={{
          zIndex: 1000,
          backgroundImage:
            "linear-gradient(to bottom, #18181B, transparent)",
        }}
      ></Box>
    </Box> */}
      <AspectRatio ratio={16 / 7}>
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original${items.backdrop_path}`}
        >
          <Group position="apart" h="100%" w="100%">
            <Box h="100%" w={30} pos="relative">
              <Box
                h="100%"
                w="100%"
                pos="absolute"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #101113, transparent)",
                }}
              />
            </Box>
            <Box h="100%" w={100} pos="relative">
              <Box
                h="100%"
                w="100%"
                pos="absolute"
                sx={{
                  backgroundImage:
                    "linear-gradient(to left, #101113, transparent)",
                }}
              />
            </Box>
          </Group>
        </BackgroundImage>
      </AspectRatio>
      <Box pos="relative">
        <Box
          pos="absolute"
          top={-50}
          w="100%"
          h={50}
          sx={{
            backgroundImage: "linear-gradient(to top, #101113, transparent)",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
