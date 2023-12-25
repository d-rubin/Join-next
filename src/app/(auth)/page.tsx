import { Metadata } from "next";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import LoginForm from "../../components/forms/LoginForm";
import Text from "../../components/Basics/Text";
import Button from "../../components/Basics/Button";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  revalidatePath("/", "layout");
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-8 py-8 shadow-md dark:bg-bgDark sm:w-[25rem]">
        <h1 className="cursor-default text-4xl font-bold dark:text-textDark">Log in</h1>
        <div className="h-0 w-24 rounded-full border-b-[3px] border-underline" />
        <LoginForm />
      </div>
      <div className="flex flex-row items-center justify-center gap-4 md:absolute md:right-4 md:top-4">
        <Text text="Not a Join user?" className="cursor-default dark:text-textDark" />
        <Link href="register" className="rounded-xl outline-none outline-offset-4 focus-visible:outline-underline">
          <Button tabIndex={-1}>Sign up</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
