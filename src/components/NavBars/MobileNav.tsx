"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "../Icon";
import Text from "../Text";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden flex flex-row fixed bottom-0 left-0 right-0 bg-primary justify-around">
      <Link
        href="summary"
        className={`flex flex-col items-center gap-1 w-24 p-4 rounded-2xl ${
          pathname === "/summary" ? "bg-secondary" : ""
        }`}
      >
        <Icon icon="summary" className="stroke-white fill-white" />
        <Text text="Summary" className="text-white" />
      </Link>
      <Link
        href="board"
        className={`flex flex-col items-center gap-1 w-24 p-4 rounded-2xl ${
          pathname === "/board" ? "bg-secondary" : ""
        }`}
      >
        <Icon icon="board" className="stroke-white fill-white" />
        <Text text="Board" className="text-white" />
      </Link>
      <Link
        href="add-task"
        className={`flex flex-col items-center gap-1 w-24 p-4 rounded-2xl whitespace-nowrap ${
          pathname === "/add-task" ? "bg-secondary" : ""
        }`}
      >
        <Icon icon="addTask" className="stroke-white fill-white" />
        <Text text="Add Tasks" className="text-white" />
      </Link>
      <Link
        href="contacts"
        className={`flex flex-col items-center gap-1 w-24 p-4 rounded-2xl ${
          pathname === "/contacts" ? "bg-secondary" : ""
        }`}
      >
        <Icon icon="contacts" className="stroke-white fill-white" />
        <Text text="Contacts" className="text-white" />
      </Link>
    </nav>
  );
};

export default MobileNav;
