import Icon from "../Icon";

export type DefaultButtonProps = {
  text: string;
  className?: string;
  outlined?: boolean;
  block?: boolean;
  loading?: boolean;
  onClick?: () => void;
  icon?: string;
  bold?: boolean;
  iconSize?: string;
  disabled?: boolean;
};

const DefaultButton = (props: DefaultButtonProps) => {
  const { className, text, disabled = false, outlined, block, loading, onClick, icon, iconSize, bold } = props;
  const defaultButtonStyling: string =
    " text-white bg-primary hover:bg-underline focus:bg-secondary focus:outline-none";
  const defaultIconStyling: string = "stroke-white fill-white";
  const outlinedButtonStyling: string =
    "text-primary bg-white border-[2px] border-primary hover:border-underline hover:text-underline focus:text-secondary focus:outline-secondary ";
  const outlinedIconStyling: string = "stroke-primary group-hover:stroke-underline group-focus:stroke-underline";

  if (loading)
    return (
      <button
        className={`animate-pulse rounded-xl py-0.5 px-7 bg-gray-500 text-gray-500 flex flex-row items-center justify-center focus:outline-none ${
          block ? "w-full" : "w-fit"
        } ${className}`}
      >
        {text}
        {icon && <Icon icon={icon} iconSize={iconSize} className="fill-none" />}
      </button>
    );

  if (disabled)
    return (
      <button
        aria-disabled={disabled}
        className={`border-[2px] text-gray-500 bg-gray-200 cursor-default pointer-events-none stroke-gray-500 fill-gray-500 rounded-xl py-0.5 px-7 flex flex-row items-center justify-center ${
          block ? "w-full" : "w-fit"
        }
         ${className}`}
      >
        {text}
        {icon && <Icon icon={icon} iconSize={iconSize} />}
      </button>
    );

  return (
    <button
      onClick={onClick}
      className={`${
        outlined ? outlinedButtonStyling : defaultButtonStyling
      } rounded-xl gap-2 py-0.5 px-7 transition-all flex flex-row items-center justify-center group hover:drop-shadow-lg ${
        bold && "font-semibold"
      } ${block ? "w-full" : "w-fit"} ${className}`}
    >
      {text}
      {icon && <Icon icon={icon} iconSize={iconSize} className={outlined ? outlinedIconStyling : defaultIconStyling} />}
    </button>
  );
};

export default DefaultButton;
