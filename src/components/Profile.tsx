"use client";

import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
// import { logout } from "../helper/serverActions";

const Profile = ({ letters, size = "h-10 w-10" }: { letters: string; size?: string }) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const cookieStore = new Cookies();
  const { push } = useRouter();

  const handleLogout = () => {
    setOpenOptions(false);
    cookieStore.remove("authToken");
    // logout();
    push("/");
  };
  const handleLogoutKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") handleLogout();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") setOpenOptions(!openOptions);
  };

  return (
    <>
      <span
        //  eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e)}
        onClick={() => setOpenOptions(!openOptions)}
        className={`cursor-pointer relative rounded-full border-2 border-secondary text-underline flex items-center justify-center font-semibold text-2xl transition-all focus:bg-grey hover:bg-grey dark:focus:bg-textDark dark:hover:bg-textDark${size}`}
      >
        {letters.toUpperCase()}
        <div
          className={`absolute z-20 w-36 h-fit -left-32 rounded-b-3xl rounded-tl-3xl bg-primary top-12 text-base text-grey font-normal flex flex-col ${
            openOptions ? "flex" : "hidden"
          }`}
        >
          <Link href="legal-notice" className="hover:bg-secondary focus:bg-secondary outline-none p-4 rounded-tl-3xl">
            Legal Notice
          </Link>
          <span
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            onKeyDown={(e) => handleLogoutKeyDown(e)}
            onClick={handleLogout}
            className="hover:bg-secondary focus:bg-secondary outline-none p-4 rounded-b-3xl"
          >
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
