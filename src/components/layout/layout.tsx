import React, { PropsWithChildren } from "react";

import NavHeader from "./navHeaders";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavHeader />
      {children}
    </>
  );
};
export default Layout;

// components/Navbar.tsx
