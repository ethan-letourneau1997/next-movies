import { Box, Divider } from "@mantine/core";
import React, { PropsWithChildren } from "react";

import BurgerNav from "../navigation/burgerNav";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box mb="xl">
      {" "}
      <BurgerNav />
      {/* <NavHeader /> */}
      {children}
    </Box>
  );
};
export default Layout;
