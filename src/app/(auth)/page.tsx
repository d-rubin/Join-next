import { Metadata } from "next";
import LoginForm from "../../components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="bg-white md:w-fit rounded-3xl px-4 py-8 gap-4 flex flex-col items-center shadow-md">
      <h1 className="text-4xl font-bold">Log in</h1>
      <div className="border-underline border-b-[3px] h-0 w-24 rounded-full" />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
