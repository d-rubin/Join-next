import { ReactNode } from "react";
import { cn } from "../utils/generalHelper";

const PagePadding = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn("h-fit px-4 pt-8 lg:mb-0 lg:h-full lg:px-16 lg:pt-20", className)}>{children}</div>;
};

export default PagePadding;
