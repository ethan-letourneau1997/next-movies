// components/Navbar.tsx

import { Flex, Menu } from "@mantine/core";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Flex gap="xl" px="xl" mb="xl" mt="md">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/movies/trending">Trending</Link>
      <Menu trigger="hover" openDelay={100} closeDelay={400}></Menu>
    </Flex>
  );
};
export default Navbar;
