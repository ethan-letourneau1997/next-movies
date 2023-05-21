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
    <Box bg="hsl(300, 12%, 6%)">
      <Flex justify="space-between" p="sm">
        <Center>
          <Title size="h3">Cinegraph</Title>
        </Center>

        <DesktopHeader />

        <Group className={classes.hiddenMobile}>
          <Autocomplete />
        </Group>
        <Burger
          className={classes.hiddenDesktop}
          opened={opened}
          onClick={toggle}
          aria-label={label}
        />
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
