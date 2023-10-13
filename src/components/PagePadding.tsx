import { ReactNode } from "react";

const PagePadding = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`px-4 pt-4 lg:pl-16 lg:pt-16 overflow-y-auto h-full ${className}`}>{children}</div>;
};

export default PagePadding;
