import { ReactNode } from "react";

const Card = ({ children, className }: { children: ReactNode; className: string }) => {
  return (
    <div className={`rounded-3xl shadow-sm bg-white flex justify-center items-center ${className}`}>{children}</div>
  );
};

export default Card;
