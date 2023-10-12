import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoDark from "../iconlib/logo-dark.svg";
import Profile from "./Profile";

const Header = () => {
  // Todo: Fetch user and

  return (
    <div className="w-full h-16 bg-white shadow-xl flex items-center px-4 justify-between">
      <Link className="flex items-center md:hidden" href="/summary">
        <Image className="h-8 w-fit object-cover" src={LogoDark} alt="Logo" />
      </Link>
      <Profile letters="D" />
    </div>
  );
};

export default Header;
