// components/Navbar.tsx

import { Anchor, Flex } from "@mantine/core";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Flex gap="xl" px="xl" mb="xl" mt="md">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/movies/trending">Trending</Link>
    </Flex>
  );
};
export default Navbar;
