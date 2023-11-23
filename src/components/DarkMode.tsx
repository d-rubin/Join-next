"use client";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

const DarkMode = () => {
  const darkMode = new Cookies().get("darkMode") === "true";
  const { refresh } = useRouter();
  const toggleDarkMode = () => {
    new Cookies().set("darkMode", (!darkMode).toString(), {
      path: "/",
      expires: new Date(new Date().getTime() * 365 * 24 * 60 * 60 * 1000),
    });
    refresh();
  };
  return (
    <Icon
      icon={darkMode ? "lightMode" : "darkMode"}
      onClick={toggleDarkMode}
      iconSize="h-8 w-8"
      focusable
      className="fill-gray-300 stroke-gray-300 outline-none hover:fill-underline hover:stroke-underline focus:fill-underline focus:stroke-underline"
    />
  );
};

export default DarkMode;
