"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden w-full h-24 bg-primary flex flex-row justify-around bottom-0 text-white fixed">
      <Link
        href="/summary"
        className={`hoverAnimation flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-secondary text-middle ${
          pathname === "/summary" ? "bg-secondary" : "bg-primary"
        }`}
      >
        <Icon icon="summary" /> <p>Summary</p>
      </Link>
      <Link
        href="/board"
        className={`hoverAnimation flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-secondary text-middle ${
          pathname === "/board" ? "bg-secondary" : "bg-primary"
        }`}
      >
        {/* <Image src={BoardIcon} alt="Board" /> */}
        <p>Board</p>
      </Link>
      <Link
        href="/add-task"
        className={`hoverAnimation flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-secondary text-middle ${
          pathname === "/add-task" ? "bg-secondary" : "bg-primary"
        }`}
      >
        {/* <Image src={AddTaskIcon} alt="Add Task" /> */}
        <p>Add Task</p>
      </Link>
      <Link
        href="/contacts"
        className={`hoverAnimation flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-secondary text-middle ${
          pathname === "/contacts" ? "bg-secondary" : "bg-primary"
        }`}
      >
        <Icon icon="contacts" /> <p>Contacts</p>
      </Link>
    </div>
  );
};

export default MobileNav;
