import { ReactNode } from "react";
import MobileNav from "../../components/NavBars/MobileNav";
import DesktopNav from "../../components/NavBars/DesktopNav";
import Header from "../../components/Header";

const PortalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DesktopNav>
      <div className="flex max-h-screen w-full flex-col overflow-y-auto">
        <Header />
        {children}
      </div>
      <MobileNav />
    </DesktopNav>
  );
};

export default PortalLayout;
