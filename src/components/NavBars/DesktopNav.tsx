import Image from "next/image";
import { ReactNode } from "react";
import logoLight from "../../iconlib/logo-light.svg";
import Icon from "../Icon";
import Text from "../Text";
import DesktopNavLink from "./DesktopNavLink";

const DesktopNav = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-row max-w-screen-2xl mr-auto">
      <nav className="hidden relative bg-primary h-screen w-56 py-10 items-center lg:flex flex flex-col gap-10">
        <div className="relative object-cover h-36 w-24">
          <Image src={logoLight} alt="Logo" priority fill />
        </div>
        <div className="flex flex-col w-full gap-4">
          <DesktopNavLink path="summary">
            <Icon icon="board" />
            <Text text="Board" className="text-lg" />
          </DesktopNavLink>
          <DesktopNavLink path="board">
            <Icon icon="board" />
            <Text text="Board" className="text-lg" />
          </DesktopNavLink>
          <DesktopNavLink path="add-task">
            <Icon icon="addTask" />
            <Text text="Add Tasks" className="text-lg" />
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
        <div className="w-full absolute bottom-10">
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
