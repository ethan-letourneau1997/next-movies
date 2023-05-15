// components/Navbar.tsx

import { Flex, Menu, Text } from "@mantine/core";

import Link from "next/link";
import React from "react";
import TmdbSearch from "./search";

const Navbar = () => {
  return (
    <Flex gap="xl" px="xl" mb="xl" mt="md">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

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
            <Link href="/tv/popular">Popular</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/tv/trending">Trending</Link>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Link href="/people/people">People</Link>

      <TmdbSearch />
    </Flex>
  );
};
export default Navbar;
