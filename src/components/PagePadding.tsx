import { ReactNode } from "react";

const PagePadding = ({ children }: { children: ReactNode }) => {
  return <div className="px-4 pt-4 lg:pl-16 lg:pt-16 overflow-y-auto">{children}</div>;
};

export default PagePadding;
