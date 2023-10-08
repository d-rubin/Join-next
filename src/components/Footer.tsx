"use client";

import Link from "next/link";
import Text from "./Text";

const Footer = () => {
  return (
    <div className="absolute bottom-8 flex flex-row gap-4">
      <Link href="legal-notice" target="_blank">
        <Text text="Legal notice" className="text-gray-400" />
      </Link>
      <Link href="privacy-policy" target="_blank">
        <Text text="Privacy Policy" className="text-gray-400" />
      </Link>
    </div>
  );
};

export default Footer;
