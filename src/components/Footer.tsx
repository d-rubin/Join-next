"use client";

import Link from "next/link";
import Text from "./Basics/Text";

const Footer = () => {
  return (
    <div className="absolute bottom-8 flex flex-row gap-4">
      <Link href="legal-notice" target="_blank" className="group focus:outline-none">
        <Text
          text="Legal notice"
          className="text-gray-400 transition-all group-hover:text-underline group-focus:text-underline dark:text-textDark"
        />
      </Link>
      <Link href="privacy-policy" target="_blank" className="group focus:outline-none">
        <Text
          text="Privacy Policy"
          className="text-gray-400 transition-all group-hover:text-underline group-focus:text-underline dark:text-textDark"
        />
      </Link>
    </div>
  );
};

export default Footer;
