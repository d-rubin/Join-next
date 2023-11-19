import { ReactNode } from "react";

const PagePadding = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`px-4 pt-8 lg:px-16 mb-24 lg:mb-0 lg:pt-20 h-fit ${className}`}>{children}</div>;
};

export default PagePadding;
