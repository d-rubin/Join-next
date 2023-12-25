"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "../Basics/Icon";
import Text from "../Basics/Text";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex flex-row justify-around bg-primary lg:hidden">
      <Link
        href="summary"
        className={`flex w-24 flex-col items-center gap-1 rounded-2xl p-4 transition-all hover:bg-secondary ${
          pathname === "/summary" ? "bg-secondary" : ""
        }`}
      >
        <Icon icon="summary" className="fill-white stroke-white" />
        <Text text="Summary" className="text-white" />
      </Link>
      <Link
        href="board"
        className={`flex w-24 flex-col items-center gap-1 rounded-2xl p-4 transition-all hover:bg-secondary ${
          pathname === "/board" ? "bg-secondary" : ""
        }`}
      >
        <Icon icon="board" className="fill-white stroke-white" />
        <Text text="Board" className="text-white" />
      </Link>
      <Link
        href="add-task"
        className={`flex w-24 flex-col items-center gap-1 whitespace-nowrap rounded-2xl p-4 transition-all hover:bg-secondary ${
          pathname === "/add-task" ? "bg-secondary" : ""
        }`}
      >
        <Icon icon="addTask" className="fill-white stroke-white" />
        <Text text="Add Tasks" className="text-white" />
      </Link>
      {/* <Link */}
      {/*  href="contacts" */}
      {/*  className={`flex flex-col items-center gap-1 w-24 p-4 rounded-2xl ${ */}
      {/*    pathname === "/contacts" ? "bg-secondary" : "" */}
      {/*  }`} */}
      {/* > */}
      {/*  <Icon icon="contacts" className="stroke-white fill-white" /> */}
      {/*  <Text text="Contacts" className="text-white" /> */}
      {/* </Link> */}
    </nav>
  );
};

export default MobileNav;
