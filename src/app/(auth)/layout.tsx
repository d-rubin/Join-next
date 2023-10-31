import { ReactNode } from "react";
import Image from "next/image";
import logoDark from "../../iconlib/logo-dark.svg";
import Footer from "../../components/Footer";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen p-4 flex flex-col justify-center items-center overflow-y-hidden max-w-screen-2xl mx-auto">
      <Image src={logoDark} alt="Dark Logo" priority width={50} height={50} className="absolute top-4 left-4" />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
