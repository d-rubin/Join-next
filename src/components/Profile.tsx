"use client";

import Cookies from "universal-cookie";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = ({ letters, size = "h-10 w-10" }: { letters: string; size?: string }) => {
  const cookieStore = new Cookies();
  const router = useRouter();
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const handleLogout = () => {
    cookieStore.remove("authToken");
    setOpenOptions(false);
    router.push("/");
  };

  return (
    <>
      <span
        onClick={() => setOpenOptions(!openOptions)}
        className={`cursor-pointer relative rounded-full border-2 border-secondary text-underline flex items-center justify-center font-semibold text-2xl ${size}`}
      >
        {letters.toUpperCase()}
        <div
          className={`absolute z-20 w-36 h-fit -left-32 rounded-b-3xl rounded-tl-3xl bg-primary top-12 text-base text-grey font-normal flex flex-col ${
            openOptions ? "flex" : "hidden"
          }`}
        >
          <Link href="legal-notice" className="hover:bg-secondary p-4 rounded-tl-3xl">
            Legal Notice
          </Link>
          <span onClick={handleLogout} className="hover:bg-secondary p-4 rounded-b-3xl">
            Log out
          </span>
        </div>
      </span>
      <div
        onClick={() => setOpenOptions(false)}
        className={`z-10 fixed left-0 bottom-0 top-0 right-0 ${openOptions ? "block" : "hidden"}`}
      />
    </>
  );
};

export default Profile;
