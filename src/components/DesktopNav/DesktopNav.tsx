"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logoLight from "../../app/img/logo-light.svg";
import summaryIcon from "../../app/img/SummaryIcon.svg";
import boardIcon from "../../app/img/boardIcon.svg";
import addTaskIcon from "../../app/img/addTaskIcon.svg";
import contactsIcon from "../../app/img/contactsIcon.svg";
import legalNoticeIcon from "../../app/img/legalNoticeIcon.svg";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <div className="bg-[--color-primary] w-2/12 min-w-[200px] max-w-[450px] h-full flex flex-col items-center justify-between text-white py-[5vh]">
      <Link href="/summary">
        <Image alt="Logo" src={logoLight} width={100} className="cursor-pointer" />
      </Link>
      <div className="flex flex-col items-center justify-between w-full h-full pt-24">
        <div className="flex w-full flex-col gap-4">
          <Link
            href="/summary"
            className="hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]"
            style={{ backgroundColor: pathname === "/summary" ? "var(--color-secondary)" : "var(--color-primary)" }}
          >
            <Image src={summaryIcon} alt="Summary Icon" />
            <p>Summary</p>
          </Link>
          <Link
            href="/board"
            className="hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]"
            style={{ backgroundColor: pathname === "/board" ? "var(--color-secondary)" : "var(--color-primary)" }}
          >
            <Image src={boardIcon} alt="Summary Icon" />
            <p>Board</p>
          </Link>
          <Link
            href="/add-task"
            className="hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]"
            style={{ backgroundColor: pathname === "/add-task" ? "var(--color-secondary)" : "var(--color-primary)" }}
          >
            <Image src={addTaskIcon} alt="Summary Icon" />
            <p>Add Task</p>
          </Link>
          <Link
            href="/contacts"
            className="hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]"
            style={{ backgroundColor: pathname === "/contacts" ? "var(--color-secondary)" : "var(--color-primary)" }}
          >
            <Image src={contactsIcon} alt="Summary Icon" />
            <p>Contacts</p>
          </Link>
        </div>
        <Link
          href="/legal-notice"
          className="hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]"
          style={{ backgroundColor: pathname === "/legal-notice" ? "var(--color-secondary)" : "var(--color-primary)" }}
        >
          <Image src={legalNoticeIcon} alt="Legal Notice Icon" />
          <p>Legal Notice</p>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
