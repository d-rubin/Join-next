import Link from "next/link";
import Image from "next/image";
import SignInForm from "../../../components/SignInForm";
import backImage from "../../../img/back.svg";

const RegisterPage = () => {
  return (
    <div className="w-fit h-fit bg-white relative p-8 items-center flex flex-col gap-4 rounded-[30px] shadow-xl">
      <Link href="/login" className="absolute top-8 left-8">
        <Image src={backImage} alt="Back" />
      </Link>
      <h2 className="text-5xl font-semibold">Sign in</h2>
      <div className="border-underline border-2 w-1/3" />
      <SignInForm />
    </div>
  );
};

export default RegisterPage;
