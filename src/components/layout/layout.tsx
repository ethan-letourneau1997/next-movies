import { Center, Flex } from "@mantine/core";
import React, { PropsWithChildren } from "react";

import Autocomplete from "../autocomplete";
import NavHeader from "./navHeaders";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Flex justify="space-between">
        {" "}
        <NavHeader />
        <Center>
          <Autocomplete />
        </Center>
      </Flex>

      {children}
    </>
  );
};
export default Layout;

// components/Navbar.tsx
