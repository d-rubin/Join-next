import Image from "next/image";
import Link from "next/link";
import LogoDark from "../iconlib/logo-dark.svg";
import Profile from "./Profile";
import Icon from "./Icon";
import Text from "./Text";

const Header = () => {
  // Todo: Fetch user and

  return (
    <div className="w-full h-16 bg-white shadow-xl flex items-center px-4 justify-between lg:pl-16 xl:rounded-r-3xl">
      <Link className="flex items-center lg:hidden" href="/summary">
        <Image className="h-8 w-fit object-cover" src={LogoDark} alt="Logo" />
      </Link>
      <Text text="Kanban Project Management Tool" className="hidden lg:block" />
      <div className="flex gap-4 items-center">
        <Link href="help">
          <Icon icon="help" className="hidden lg:block stroke-gray-300 fill-gray-300" iconSize="h-8 w-8" />
        </Link>
        <Profile letters="D" />
      </div>
    </div>
  );
};

export default Header;
