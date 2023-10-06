import { DefaultButtonProps } from "../../types";
import Icon from "../Icon";

const DefaultButton = (props: DefaultButtonProps) => {
  const { className, text, outlined, block, loading, onClick, icon, iconSize, bold } = props;
  const defaultButtonStyling: string = " text-white bg-primary hover:bg-underline focus:bg-secondary";
  const defaultIconStyling: string = "stroke-white fill-white";
  const outlinedButtonStyling: string =
    "text-primary bg-white border-[2px] border-primary hover:border-underline hover:text-underline focus:text-secondary focus:outline-secondary ";
  const outlinedIconStyling: string = "stroke-primary group-hover:stroke-underline group-focus:stroke-underline";

  if (loading)
    return (
      <button
        className={`animate-pulse rounded-xl py-0.5 px-7 text-2xl bg-gray-500 text-gray-500 flex flex-row items-center justify-center ${
          block ? "w-full" : "w-fit"
        } ${className}`}
      >
        {text}
        {icon && <Icon icon={icon} iconSize={iconSize} className="fill-none" />}
      </button>
    );

  return (
    <button
      onClick={onClick}
      className={`${
        outlined ? outlinedButtonStyling : defaultButtonStyling
      } rounded-xl gap-2 py-0.5 px-7 transition-all text-2xl flex flex-row items-center justify-center group hover:drop-shadow-lg ${
        bold && "font-semibold"
      } ${block ? "w-full" : "w-fit"} ${className}`}
    >
      {text}
      {icon && <Icon icon={icon} iconSize={iconSize} className={outlined ? outlinedIconStyling : defaultIconStyling} />}
    </button>
  );
};

export default DefaultButton;
