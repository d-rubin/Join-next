"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

const DesktopNavLink = ({
  path,
  children,
  target,
}: {
  path: string;
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      target={target}
      className={`w-full py-2.5 pl-10 flex flex-row items-center gap-2.5 text-white stroke-white fill-white cursor-pointer hover:bg-secondary outline-none focus:bg-underline ${
        pathname === `/${path}` ? "bg-secondary" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default DesktopNavLink;
