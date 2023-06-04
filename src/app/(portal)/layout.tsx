import React from "react";

const PortalLayout = ({children}: {children: React.ReactNode}) => {
    return <div className="w-1/4 bg-blue-950 h-full">{children}</div>
}

export default PortalLayout;
