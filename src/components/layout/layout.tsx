import React, { PropsWithChildren } from "react";

import Autocomplete from "../autocomplete";
import NavHeader from "./navHeaders";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Autocomplete />
      <NavHeader />
      {children}
    </>
  );
};
export default Layout;

// components/Navbar.tsx
