import Image from "next/image";
import LogoLight from "../../../img/logo-light.svg";

const LoginPage = () => {
  return (
    <>
      <div className="absolute hidden w-full h-full left-0 top-0 bg-[--color-primary] z-10 FadingAnimation" />
      <Image
        className="absolute w-52 hidden top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 FadingAnimation"
        src={LogoLight}
        alt="Logo"
      />
    </>
  );
};

export default LoginPage;
