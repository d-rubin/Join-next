import { ReactNode } from "react";
import MobileNav from "../../components/NavBars/MobileNav";
import DesktopNav from "../../components/NavBars/DesktopNav";

const PortalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DesktopNav />
      {children}
      <MobileNav />
    </>
  );
};

export default PortalLayout;
