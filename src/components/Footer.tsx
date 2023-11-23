"use client";

import Link from "next/link";
import Text from "./Text";

const Footer = () => {
  return (
    <div className="absolute bottom-8 flex flex-row gap-4">
      <Link href="legal-notice" target="_blank" className="focus:outline-none group">
        <Text
          text="Legal notice"
          className="text-gray-400 dark:text-gray-100 hover:text-underline transition-all group-focus:text-underline"
        />
      </Link>
      <Link href="privacy-policy" target="_blank" className="focus:outline-none group">
        <Text
          text="Privacy Policy"
          className="text-gray-400 dark:text-gray-100 hover:text-underline transition-all group-focus:text-underline"
        />
      </Link>
    </div>
  );
};

export default Footer;
