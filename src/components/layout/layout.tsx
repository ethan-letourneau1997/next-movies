import { Box, Divider } from "@mantine/core";
import React, { PropsWithChildren } from "react";

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
