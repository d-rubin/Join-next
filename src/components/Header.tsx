import Image from "next/image";
import Link from "next/link";
import LogoDark from "../iconlib/logo-dark.svg";
import Profile from "./Profile";
import Icon from "./Basics/Icon";
import Text from "./Basics/Text";
import { getCurrentUser } from "../utils/serverActions";
import DarkMode from "./DarkMode";

const Header = async () => {
  const currentUser = await getCurrentUser();

  const getLetter = (user: { username: string; email: string }) => {
    if ("username" in user) return user.username.charAt(0).toUpperCase();
    return "-";
  };

  return (
    <div className="min-h-16 flex h-16 w-full items-center justify-between bg-white px-4 shadow-xl dark:bg-bgDark dark:text-textDark lg:pl-16 2xl:rounded-r-3xl">
      <Link className="flex h-16 items-center justify-center px-2 outline-none focus:bg-grey lg:hidden" href="/summary">
        <Image className="h-8 w-fit object-cover" src={LogoDark} alt="Logo" />
      </Link>
      <Text
        text="Kanban Project Management Tool"
        className="min-h-16 hidden h-16 cursor-default items-center lg:flex"
      />
      <div className="flex items-center gap-4">
        <DarkMode />
        <Link href="help" className="group hidden h-fit items-center justify-center outline-none lg:flex">
          <Icon
            icon="help"
            className="fill-gray-300 stroke-gray-300 group-hover:fill-gray-400 group-hover:stroke-gray-400 group-focus:fill-gray-400 group-focus:stroke-gray-400"
            iconSize="h-8 w-8"
          />
        </Link>
        <Profile letters={getLetter(currentUser as { username: string; email: string })} />
      </div>
    </div>
  );
};

export default Header;
