import Image from "next/image";
import { ReactNode } from "react";
import logoLight from "../../iconlib/logo-light.svg";
import Icon from "../Basics/Icon";
import Text from "../Basics/Text";
import DesktopNavLink from "./DesktopNavLink";

const DesktopNav = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mr-auto flex max-w-screen-2xl flex-row">
      <nav className="relative hidden h-screen w-56 flex-col items-center gap-10 bg-primary py-10 lg:flex">
        <div className="relative h-36 w-24 object-cover">
          <Image src={logoLight} alt="Logo" priority fill />
        </div>
        <div className="flex w-full flex-col gap-4">
          <DesktopNavLink path="summary">
            <Icon icon="summary" />
            <Text text="Summary" className="text-lg" />
          </DesktopNavLink>
          <DesktopNavLink path="board">
            <Icon icon="board" />
            <Text text="Board" className="text-lg" />
          </DesktopNavLink>
          <DesktopNavLink path="add-task">
            <Icon icon="addTask" />
            <Text text="Add Task" className="text-lg" />
          </DesktopNavLink>
          {/* <Link */}
          {/*  href="contacts" */}
          {/*  className={`w-full py-2.5 pl-10 flex flex-row items-center gap-2.5 text-white stroke-white fill-white hover:bg-secondary ${ */}
          {/*    pathname === "/contacts" ? "bg-secondary" : "" */}
          {/*  }`} */}
          {/* > */}
          {/*  <Icon icon="contacts" /> */}
          {/*  <Text text="Contacts" className="text-lg" /> */}
          {/* </Link> */}
        </div>
        <div className="absolute bottom-10 w-full">
          <DesktopNavLink path="privacy-policy" target="_blank">
            Privacy Policy
          </DesktopNavLink>
          <DesktopNavLink path="legal-notice" target="_blank">
            Legal notice
          </DesktopNavLink>
        </div>
      </nav>
      {children}
    </main>
  );
};

export default DesktopNav;
