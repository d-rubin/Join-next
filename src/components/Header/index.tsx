import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpImage from "../../img/help.svg";
import LogoDark from "../../img/logo-dark.svg";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full md:w-10/12 right-0 absolute h-full overflow-y-hidden mb-20">
      <div className="w-full h-20 bg-white shadow-xl flex items-center md:px-16 px-8 justify-between">
        <Link className="flex items-center md:hidden" href="/summary">
          <Image className="h-16 w-fit py-2 object-contain" src={LogoDark} alt="Logo" />
        </Link>
        <h3 className="md:flex hidden text-xl">Kanban Project Management Tool</h3>
        <div className="flex items-center gap-4">
          <Link href="/help">
            <Image className="md:block hidden" src={HelpImage} alt="Help" />
          </Link>
          {/* Todo: Implement Initials from logged in user here */}
          {/* <div className="h-12 aspect-square bg-primary rounded-full text-white text-2xl flex items-center justify-center"> */}
          {/*  DR */}
          {/* </div> */}
        </div>
      </div>
      <div className="md:p-16 p-8 mb-24 sm:mb-0">{children}</div>
    </div>
  );
};

export default Header;
