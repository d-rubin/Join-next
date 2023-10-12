"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import logoLight from "../../iconlib/logo-light.svg";
import Icon from "../Icon";
import Text from "../Text";

const DesktopNav = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <main className="flex flex-row">
      <nav className="hidden relative bg-primary h-screen w-56 py-10 items-center lg:flex flex flex-col gap-10">
        <div className="relative object-cover h-36 w-24">
          <Image src={logoLight} alt="Logo" priority fill />
        </div>
        <div className="flex flex-col w-full gap-4">
          <Link
            href="summary"
            className={`w-full py-2.5 pl-10 flex flex-row items-center gap-2.5 text-white stroke-white fill-white ${
              pathname === "/summary" ? "bg-secondary" : ""
            }`}
          >
            <Icon icon="summary" />
            <Text text="Summary" className="text-lg" />
          </Link>
          <Link
            href="board"
            className={`w-full py-2.5 pl-10 flex flex-row items-center gap-2.5 text-white stroke-white fill-white ${
              pathname === "/board" ? "bg-secondary" : ""
            }`}
          >
            <Icon icon="board" />
            <Text text="Board" className="text-lg" />
          </Link>
          <Link
            href="add-task"
            className={`w-full py-2.5 pl-10 flex flex-row items-center gap-2.5 text-white stroke-white fill-white ${
              pathname === "/add-task" ? "bg-secondary" : ""
            }`}
          >
            <Icon icon="addTask" />
            <Text text="Add Tasks" className="text-lg" />
          </Link>
          <Link
            href="contacts"
            className={`w-full py-2.5 pl-10 flex flex-row items-center gap-2.5 text-white stroke-white fill-white ${
              pathname === "/contacts" ? "bg-secondary" : ""
            }`}
          >
            <Icon icon="contacts" />
            <Text text="Contacts" className="text-lg" />
          </Link>
        </div>
        <Link
          href="legal-notice"
          className={`w-full absolute bottom-10 py-2.5 flex flex-row items-center justify-center gap-2.5 text-grey ${
            pathname === "/legal-notice" ? "bg-secondary" : ""
          }`}
        >
          Legal notice
        </Link>
      </nav>
      {children}
    </main>
  );
};

export default DesktopNav;
