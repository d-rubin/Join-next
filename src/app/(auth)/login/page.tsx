import LoginForm from "../../../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-fit h-fit bg-white relative p-8 items-center flex flex-col gap-4 rounded-[30px] shadow-xl">
      <h2 className="text-5xl font-semibold">Log in </h2>
      <div className="border-[--color-underline] border-2 w-1/3" />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
