import React, { PropsWithChildren } from "react";

import { Box } from "@mantine/core";
import NavHeader from "./navHeaders";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      {" "}
      <NavHeader />
      {children}
    </Box>
  );
};
export default Layout;

// components/Navbar.tsx
