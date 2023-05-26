import React, { PropsWithChildren } from "react";

import { Box } from "@mantine/core";
import BurgerNav from "../navigation/burgerNav";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box mb="xl">
      <BurgerNav />
      {children}
    </Box>
  );
};
export default Layout;
