import { Flex, Menu, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";

import Link from "next/link";
import TmdbSearch from "./search";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};
export default Layout;

// components/Navbar.tsx

function Navigation() {
  return (
    <Flex gap="xl" px="xl" mb="xl" mt="md">
      <Link href="/">Home</Link>

      <Menu trigger="hover" shadow="md">
        <Menu.Target>
          <Text>Movies</Text>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Menu.Item>
              <Link href="/movies/popular">Popular</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/movies/trending">Trending</Link>
            </Menu.Item>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Menu trigger="hover" shadow="md">
        <Menu.Target>
          <Text>TV</Text>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <Link href="/shows/popular">Popular</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/shows/trending">Trending</Link>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Link href="/people/people">People</Link>

      <TmdbSearch />
    </Flex>
  );
}
