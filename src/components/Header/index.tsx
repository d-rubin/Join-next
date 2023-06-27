import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-20 bg-white shadow-xl flex align-middle">
        <h3 className="text-xl items-center flex">Kanban Project Management Tool</h3>
      </div>
      <div className="md:p-16 p-8">{children}</div>
    </div>
  );
};

export default Header;
