import { ReactNode } from "react";
import { cn } from "src/utils/generalHelper";

const Card = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "flex cursor-default items-center justify-center rounded-3xl bg-white shadow-sm dark:bg-bgDark dark:text-textDark",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
