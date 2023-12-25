"use client";

import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { cn } from "../utils/generalHelper";
// import { logout } from "../utils/serverActions";

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
        className={cn(
          "relative flex cursor-pointer items-center justify-center rounded-full border-2 border-secondary text-2xl font-semibold text-underline transition-all hover:bg-grey focus:bg-grey dark:hover:bg-textDark dark:focus:bg-textDark",
          size,
        )}
      >
        {letters.toUpperCase()}
        <div
          className={`absolute -left-32 top-12 z-20 flex h-fit w-36 flex-col rounded-b-3xl rounded-tl-3xl bg-primary text-base font-normal text-grey ${
            openOptions ? "flex" : "hidden"
          }`}
        >
          <Link href="legal-notice" className="rounded-tl-3xl p-4 outline-none hover:bg-secondary focus:bg-secondary">
            Legal Notice
          </Link>
          <span
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            onKeyDown={(e) => handleLogoutKeyDown(e)}
            onClick={handleLogout}
            className="rounded-b-3xl p-4 outline-none hover:bg-secondary focus:bg-secondary"
          >
            Log out
          </span>
        </div>
      </span>
      <div
        onClick={() => setOpenOptions(false)}
        className={`fixed bottom-0 left-0 right-0 top-0 z-10 ${openOptions ? "block" : "hidden"}`}
      />
    </>
  );
};

export default Profile;
