import {
  AspectRatio,
  Box,
  Divider,
  Overlay,
  SimpleGrid,
  Spoiler,
  Text,
  Tooltip,
} from "@mantine/core";

import Image from "next/image";
import React from "react";
import { WatchProvider } from "../../../../types";
import { useElementSize } from "@mantine/hooks";

interface WhereToWatchTypes {
  handleProviderClick: (value: string) => void;
  providers: WatchProvider[];
  desktop: boolean;
  selectedProviders: string[];
}

function WhereToWatchSection({
  desktop,
  handleProviderClick,
  providers,
  selectedProviders,
}: WhereToWatchTypes) {
  // height ref for spoiler
  const { ref, width, height } = useElementSize();

  return (
    <Box px="md">
      <Divider mb="lg" />

      <Text fz={desktop ? "md" : "md"} mb={desktop ? "" : "xl"}>
        Sort results by provider:
      </Text>
      <Spoiler
        mt="xs"
        maxHeight={desktop ? 220 : height * 3.6}
        showLabel="See all"
        fz={desktop ? "md" : "md"}
        hideLabel="Hide"
        transitionDuration={0}
        styles={(theme) => ({
          control: {},
        })}
        sx={{
          flexGrow: 1,
        }}
      >
        {/* Content here */}
        <SimpleGrid cols={desktop ? 4 : 5} spacing={desktop ? "xs" : "md"}>
          {providers.map((provider) => (
            <Tooltip
              fz="xs"
              label={provider.provider_name}
              key={provider.provider_id}
            >
              <AspectRatio
                // handle provider click and add or remove from selectedProviders
                onClick={() => handleProviderClick(provider.provider_id)}
                ratio={1 / 1}
                sx={{
                  border: selectedProviders.includes(provider.provider_id)
                    ? "2px solid #fcc419"
                    : "none", // Add border if ID is in state
                  borderRadius: "6px",
                  "&:hover": {
                    border: "2px solid #fcc419",
                  },
                }}
              >
                <Overlay
                  ref={ref}
                  color="#fcc419"
                  sx={{
                    opacity: selectedProviders.includes(provider.provider_id)
                      ? 0.5
                      : 0, // Add border if ID is in state
                    borderRadius: "6px",
                    "&:hover": {
                      border: "2px solid #fcc419",
                    },
                  }}
                ></Overlay>
                <Image
                  fill
                  style={{
                    borderRadius: "4px",
                  }}
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                />
              </AspectRatio>
            </Tooltip>
          ))}
        </SimpleGrid>
      </Spoiler>
    </Box>
  );
}

export default WhereToWatchSection;
