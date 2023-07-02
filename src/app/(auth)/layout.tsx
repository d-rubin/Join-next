import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoDark from "../../img/logo-dark.svg";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Link href="/login">
        <Image className="absolute w-14 top-8 left-8" src={LogoDark} alt="Logo" />
      </Link>
      <div className="w-full h-full p-8 pt-32 flex flex-col items-center">{children}</div>
    </>
  );
};

export default AuthLayout;
