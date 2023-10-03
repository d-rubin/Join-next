"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logoLight from "../../iconlib/logo-light.svg";
import summaryIcon from "../../iconlib/SummaryIcon.svg";
import contactsIcon from "../../iconlib/contactsIcon.svg";
import legalNoticeIcon from "../../iconlib/legalNoticeIcon.svg";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <div className="md:flex hidden bg-primary w-2/12 max-w-[450px] h-screen flex flex-col items-center justify-between text-white py-[5vh] fixed">
      <Link href="/summary">
        <Image alt="Logo" src={logoLight} width={100} className="cursor-pointer" />
      </Link>
      <div className="flex flex-col items-center justify-between w-full h-full pt-24">
        <div className="flex w-full flex-col gap-4">
          <Link
            href="/summary"
            className={`hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-secondary ${
              pathname === "/summary" ? "bg-secondary" : "bg-primary"
            }`}
          >
            <Image src={summaryIcon} alt="Summary Icon" />
            <p>Summary</p>
          </Link>
          <Link
            href="/board"
            className={`hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-secondary ${
              pathname === "/board" ? "bg-secondary" : "bg-primary"
            }`}
          >
            {/* <Image src={boardIcon} alt="Summary Icon" /> */}
            <p>Board</p>
          </Link>
          <Link
            href="/add-task"
            className={`hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-secondary ${
              pathname === "/add-task" ? "bg-secondary" : "bg-primary"
            }`}
          >
            {/* <Image src={addTaskIcon} alt="Summary Icon" /> */}
            <p>Add Task</p>
          </Link>
          <Link
            href="/contacts"
            className={`hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-secondary ${
              pathname === "/contacts" ? "bg-secondary" : "bg-primary"
            }`}
          >
            <Image src={contactsIcon} alt="Summary Icon" />
            <p>Contacts</p>
          </Link>
        </div>
        <Link
          href="/legal-notice"
          className={`hoverAnimation flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-secondary ${
            pathname === "/legal-notice" ? "bg-secondary" : "bg-primary"
          }`}
        >
          <Image src={legalNoticeIcon} alt="Legal Notice Icon" />
          <p>Legal Notice</p>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
