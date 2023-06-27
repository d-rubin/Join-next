import React from "react";
import DesktopNav from "../../components/DesktopNav";
import MobileNav from "../../components/MobileNav";
import Header from "../../components/Header";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex-row flex-col flex h-full w-full">
      <DesktopNav />
      <Header>{children}</Header>
      <MobileNav />
    </div>
  );
};

export default PortalLayout;
