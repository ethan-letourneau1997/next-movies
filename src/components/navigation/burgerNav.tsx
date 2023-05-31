import {
  Box,
  Burger,
  Center,
  Collapse,
  Flex,
  Group,
  Title,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";

import Autocomplete from "../autocomplete";
import DesktopHeader from "./desktopHeader";
import { FaSearch } from "react-icons/fa";
import MobileCollapse from "./mobileCollapse";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function BurgerNav() {
  // styles
  const { classes, theme } = useStyles();

  // mobile nav state
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  // prevent scroll on mobile nav
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opened]);

  return (
    <Box
      // bg="#27272A"
      // bg="dark.9"
      bg="transparent"
    >
      <Flex justify="space-between" p="sm">
        <Center>
          <Burger
            className={classes.hiddenDesktop}
            opened={opened}
            onClick={toggle}
            aria-label={label}
          />
          <Title c="yellow.5" size="h2" ml="xs" fw={700}>
            Cinegraph
          </Title>
        </Center>

        <DesktopHeader />

        <Autocomplete />
      </Flex>
      <Collapse
        className={classes.hiddenDesktop}
        pb="xl"
        w="100%"
        bg="dark.9"
        in={opened}
        pos="absolute"
        transitionDuration={250}
        transitionTimingFunction="linear"
        sx={{
          zIndex: 1000,
        }}
      >
        <MobileCollapse />
      </Collapse>
    </Box>
  );
}
