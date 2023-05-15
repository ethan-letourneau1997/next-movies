import React, { PropsWithChildren } from "react";

import Navigation from "./navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};
export default Layout;
