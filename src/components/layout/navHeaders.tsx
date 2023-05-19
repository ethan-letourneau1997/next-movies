import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  Header,
  Image,
  Menu,
  ScrollArea,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";

import Autocomplete from "../autocomplete";
import Link from "next/link";
import Logo from "../../../public/cinegraph-logo.png";
import styles from "@/styles/Home.module.css";
import { useDisclosure } from "@mantine/hooks";

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

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export default function NavHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb="xl" pt="sm">
      <Container fluid>
        <Header
          px="xl"
          height={60}
          bg="brand.5"
          sx={{
            borderBottom: "none",
          }}
        >
          <Group position="apart" sx={{ height: "100%" }}>
            <Title
              c="brand.4"
              size="h2"
              sx={{
                letterSpacing: "2px",
              }}
            >
              Cinegraph
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
                </Menu.Dropdown>
              </Menu>
              <a href="#" className={classes.link}>
                Learn
              </a>
              <a href="#" className={classes.link}>
                Academy
              </a>
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
      </Container>

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
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

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

// import Autocomplete from "../autocomplete";
// import Link from "next/link";
// import TmdbSearch from "../search";

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
