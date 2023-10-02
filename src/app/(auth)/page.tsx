import Link from "next/link";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="w-fit h-fit bg-white relative p-8 items-center flex flex-col gap-4 rounded-[30px] shadow-xl">
        <h2 className="text-5xl font-semibold">Log in </h2>
        <div className="border-underline border-2 w-1/3" />
        <LoginForm />
      </div>
      <div className="flex flex-row gap-4 items-center absolute bottom-16 sm:right-8 sm:top-8 h-fit">
        <span>Not a Join user?</span>
        <Link href="/register">
          <button type="button" className="w-fit h-10 px-4 bg-primary rounded-lg text-white text-xl">
            Sign up
          </button>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
