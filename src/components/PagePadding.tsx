import { ReactNode } from "react";

const PagePadding = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`px-4 pt-4 lg:pl-16 mb-24 lg:pt-20 h-fit ${className}`}>{children}</div>;
};

export default PagePadding;
