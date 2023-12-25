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
      className={`flex w-full cursor-pointer flex-row items-center gap-2.5 fill-white stroke-white py-2.5 pl-10 text-white outline-none hover:bg-secondary focus:bg-underline ${
        pathname === `/${path}` ? "bg-secondary" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default DesktopNavLink;
