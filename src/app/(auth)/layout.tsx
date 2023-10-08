import { ReactNode } from "react";
import Image from "next/image";
import logoDark from "../../iconlib/logo-dark.svg";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen p-4 flex flex-col justify-center items-center">
      <Image src={logoDark} alt="Dark Logo" priority width={50} height={50} className="absolute top-4 left-4" />
      {children}
    </div>
  );
};

export default AuthLayout;
