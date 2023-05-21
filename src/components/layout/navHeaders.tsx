import {
  Anchor,
  Box,
  Burger,
  Button,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Group,
  Header,
  Menu,
  NavLink,
  ScrollArea,
  Text,
  Title,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { IconChevronDown, IconFingerprint } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import Autocomplete from "../autocomplete";
import Link from "next/link";
import { TbMovie } from "react-icons/tb";
import styles from "@/styles/Home.module.css";

// import Autocomplete from "../autocomplete";
// import Link from "next/link";
// import TmdbSearch from "../search";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontSize: rem(16),
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

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

export default function NavHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  <UnstyledButton className={classes.subLink}>
    <Group noWrap align="flex-start">
      <div>
        <Text size="sm" fw={500}>
          Popular
        </Text>
      </div>
    </Group>
  </UnstyledButton>;

  const [openedMovies, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <Header
        py="sm"
        px={desktop ? "xl" : "md"}
        height={desktop ? "fit-content" : "fit-content"}
        bg={desktop ? "brand.9" : "brand.8"}
        sx={{
          borderBottom: "none",
        }}
      >
        <Group position="apart" sx={{ height: "100%" }}>
          <Title
            c="accent.0"
            size={desktop ? "h2" : "h3"}
            fw={400}
            sx={{
              letterSpacing: "2px",
            }}
          >
            Cinegraph.
          </Title>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Menu trigger="hover" shadow="md" zIndex={800}>
              <Menu.Target>
                <Text className={classes.link}>Shows</Text>
              </Menu.Target>
              <Menu.Dropdown classNames={styles.dropdown}>
                <Menu.Item>
                  <Link href="/shows/popular">Popular</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/shows/trending">Trending</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/shows/top100">Top 100</Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Menu trigger="hover" shadow="md" zIndex={800}>
              <Menu.Target>
                <Text className={classes.link}>Movies</Text>
              </Menu.Target>
              <Menu.Dropdown classNames={styles.dropdown}>
                <Menu.Item>
                  <Link href="/movies/popular">Popular</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/movies/trending">Trending</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/movies/top100">Top 100</Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Link href="/" className={classes.link}>
              People
            </Link>
            <Link href="/" className={classes.link}>
              Explore
            </Link>
          </Group>
          <Group className={classes.hiddenMobile}>
            <Autocomplete />
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Divider
        mb={30}
        mt="sm"
        color="rgba(255,255,255,.1)"
        className={classes.hiddenMobile}
      />
      {/* <Divider
          color="rgba(255,255,255,.1)"
          className={classes.hiddenDesktop}
        /> */}

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Anchor href="/" component={Link} className={classes.link}>
            Home
          </Anchor>

          <Box>
            <Group position="center" mb={5}>
              <UnstyledButton className={classes.link} onClick={toggle}>
                <Flex justify="center" w="100%">
                  <TbMovie color="#ced4da" size={18} />
                  <Box component="span" mx={5}>
                    Movies
                  </Box>
                  <IconChevronDown size={16} color="#909296" />
                </Flex>
              </UnstyledButton>
            </Group>

            <Collapse in={openedMovies}>
              <Flex direction="column" align="center">
                <Text>Popular</Text>
                <Text>Trending</Text>
                <Text>Top 100</Text>
              </Flex>
            </Collapse>
          </Box>
          <Box w={240}>
            <NavLink
              label="First parent link"
              icon={<TbMovie size="1rem" />}
              childrenOffset={28}
            >
              <NavLink label="Popular" />
              <NavLink label="Trending" />
              <NavLink label="Top 100" />
            </NavLink>

            <NavLink
              label="Second parent link"
              icon={<IconFingerprint size="1rem" stroke={1.5} />}
              childrenOffset={28}
              defaultOpened
            >
              <NavLink label="First child link" />
              <NavLink label="Second child link" />
              <NavLink label="Third child link" />
            </NavLink>
          </Box>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

// import { Flex, Menu, Text } from "@mantine/core";

// export default function NavHeader() {
//   return (
//     <Flex gap="xl" px="xl" bg="brand.1">
//       <Link href="/">Home</Link>

//       <Menu trigger="hover" shadow="md">
//         <Menu.Target>
//           <Text>Movies</Text>
//         </Menu.Target>
//         <Menu.Dropdown>
//           <Menu.Item>
//             <Menu.Item>
//               <Link href="/movies/popular">Popular</Link>
//             </Menu.Item>
//             <Menu.Item>
//               <Link href="/movies/trending">Trending</Link>
//             </Menu.Item>
//           </Menu.Item>
//         </Menu.Dropdown>
//       </Menu>

//       <Menu trigger="hover" shadow="md">
//         <Menu.Target>
//           <Text>TV</Text>
//         </Menu.Target>

//         <Menu.Dropdown>
//           <Menu.Item>
//             <Link href="/shows/popular">Popular</Link>
//           </Menu.Item>
//           <Menu.Item>
//             <Link href="/shows/trending">Trending</Link>
//           </Menu.Item>
//         </Menu.Dropdown>
//       </Menu>

//       <Link href="/people/people">People</Link>

//       <Autocomplete />
//     </Flex>
//   );
// }
