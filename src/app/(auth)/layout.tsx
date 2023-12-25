import { ReactNode } from "react";
import Image from "next/image";
import logoDark from "../../iconlib/logo-dark.svg";
import Footer from "../../components/Footer";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center justify-center overflow-y-hidden p-4">
      <Image src={logoDark} alt="Dark Logo" priority width={75} height={75} className="absolute left-4 top-4" />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
