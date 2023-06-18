import React from "react";
import DesktopNav from "../../components/DesktopNav/DesktopNav";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row h-full w-full">
      <DesktopNav />
      {children}
    </div>
  );
};

export default PortalLayout;
