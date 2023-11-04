import Image from "next/image";
import Link from "next/link";
import LogoDark from "../iconlib/logo-dark.svg";
import Profile from "./Profile";
import Icon from "./Icon";
import Text from "./Text";
import { getCurrentUser } from "../helper/serverActions";

const Header = async () => {
  const currentUser = await getCurrentUser();

  const getLetter = (user: { username: string; email: string }) => {
    if ("username" in user) return user.username.charAt(0).toUpperCase();

    console.error("Could not fetch user");
    return "-";
  };

  return (
    <div className="w-full h-16 bg-white shadow-xl flex items-center px-4 justify-between lg:pl-16 2xl:rounded-r-3xl">
      <Link className="flex items-center justify-center h-16 lg:hidden" href="/summary">
        <Image className="h-8 w-fit object-cover" src={LogoDark} alt="Logo" />
      </Link>
      <Text text="Kanban Project Management Tool" className="hidden lg:block cursor-default" />
      <div className="flex gap-4 items-center">
        <Link href="help" className="hidden lg:flex h-16 items-center justify-center">
          <Icon
            icon="help"
            className=" stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:fill-gray-400"
            iconSize="h-8 w-8"
          />
        </Link>
        <Profile letters={getLetter(currentUser)} />
      </div>
    </div>
  );
};

export default Header;
