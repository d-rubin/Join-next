"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SummaryIcon from "../../img/SummaryIcon.svg";
import BoardIcon from "../../img/boardIcon.svg";
import ContactsIcon from "../../img/contactsIcon.svg";
import AddTaskIcon from "../../img/addTaskIcon.svg";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden w-full h-24 bg-[--color-primary] flex flex-row justify-around bottom-0 text-white fixed">
      <Link
        href="/summary"
        className="hoverAnimation flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-[--color-secondary]"
        style={{ backgroundColor: pathname === "/summary" ? "var(--color-secondary)" : "var(--color-primary)" }}
      >
        <Image src={SummaryIcon} alt="Summary" />
        <p>Summary</p>
      </Link>
      <Link
        href="/board"
        className="hoverAnimation flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-[--color-secondary]"
        style={{ backgroundColor: pathname === "/board" ? "var(--color-secondary)" : "var(--color-primary)" }}
      >
        <Image src={BoardIcon} alt="Board" />
        <p>Board</p>
      </Link>
      <Link
        href="/add-task"
        className="hoverAnimation flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-[--color-secondary]"
        style={{ backgroundColor: pathname === "/add-task" ? "var(--color-secondary)" : "var(--color-primary)" }}
      >
        <Image src={AddTaskIcon} alt="Add Task" />
        <p>Add Task</p>
      </Link>
      <Link
        href="/contacts"
        className="flex flex-col items-center justify-center h-full gap-2 px-4 cursor-pointer hover:bg-[--color-secondary]"
        style={{ backgroundColor: pathname === "/contacts" ? "var(--color-secondary)" : "var(--color-primary)" }}
      >
        <Image src={ContactsIcon} alt="Contacts" />
        <p>Contacts</p>
      </Link>
    </div>
  );
};

export default MobileNav;
