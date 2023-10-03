import { iconLib } from "../../iconlib/iconLib";
import { DefaultButtonProps } from "../../types";

const DefaultButton = (props: DefaultButtonProps) => {
  const { className, text, outlined, block, loading, onClick, icon, iconSize, bold } = props;
  const defaultButtonStyling: string = " text-white bg-primary hover:bg-underline focus:bg-secondary";
  const defaultIconStyling: string = "stroke-white";
  const outlinedButtonStyling: string =
    "text-primary bg-white border-[2px] border-primary hover:border-underline hover:text-underline focus:text-secondary focus:outline-secondary ";
  const outlinedIconStyling: string = "stroke-primary group-hover:stroke-underline group-focus:stroke-secondary";

  if (loading)
    return (
      <button
        className={`animate-pulse rounded-xl py-0.5 px-7 text-2xl bg-gray-500 text-gray-500 flex flex-row items-center justify-center${
          block ? "w-full" : "w-fit"
        } ${className}`}
      >
        {text}
        {icon && icon in iconLib && (
          <svg
            viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
            className={`ml-2 transition-all animate-pulse fill-none ${!iconSize && "h-8 w-8"}`}
            width={iconSize || undefined}
            height={iconSize || undefined}
          >
            {iconLib[icon].path.map((path) => {
              return <path key={path} d={path} />;
            })}
          </svg>
        )}
      </button>
    );

  return (
    <button
      onClick={onClick}
      className={`${
        outlined ? outlinedButtonStyling : defaultButtonStyling
      } rounded-xl py-0.5 px-7 transition-all text-2xl flex flex-row items-center justify-center group ${
        bold && "font-semibold"
      } ${block ? "w-full" : "w-fit"} ${className}`}
    >
      {text}
      {icon && icon in iconLib && (
        <svg
          viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
          className={`ml-2 transition-all fill-none ${!iconSize && "h-8 w-8"} ${
            outlined ? outlinedIconStyling : defaultIconStyling
          }`}
          width={iconSize || undefined}
          height={iconSize || undefined}
        >
          {iconLib[icon].path.map((path) => {
            return <path key={path} d={path} className="stroke-2" />;
          })}
        </svg>
      )}
    </button>
  );
};

export default DefaultButton;
