import Image from "next/image";
import UserIcon from "../../../img/userIcon.svg";
import EmailIcon from "../../../img/emailIcon.svg";
import LockIcon from "../../../img/lockIcon.svg";

const RegisterPage = () => {
  return (
    <div className="w-fit h-fit bg-white relative p-8 items-center flex flex-col gap-4 rounded-[30px] shadow-xl">
      <h2 className="text-5xl font-semibold">Sign in</h2>
      <div className="border-[--color-underline] border-2 w-1/3" />
      <form method="post" className="gap-4">
        <div className="w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center">
          <input type="text" placeholder="Username" className="w-11/12 opacity-50" />
          <Image src={UserIcon} alt="User Icon" className="w-1/12 h-4" />
        </div>
        <div className="w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center">
          <input type="email" placeholder="Email" className="w-11/12 opacity-50" />
          <Image src={EmailIcon} alt="Email Icon" className="w-1/12 h-4" />
        </div>
        <div className="w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center">
          <input type="password" placeholder="Password" className="w-11/12 opacity-50" />
          <Image src={LockIcon} alt="Password Icon" className="w-1/12 h-4" />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
