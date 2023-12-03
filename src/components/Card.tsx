import { ReactNode } from "react";

const Card = ({ children, className }: { children: ReactNode; className: string }) => {
  return (
    <div
      className={`rounded-3xl dark:text-textDark shadow-sm bg-white dark:bg-bgDark flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
