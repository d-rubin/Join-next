import { iconLib } from "../../iconlib/iconLib";
import { DefaultButtonProps } from "../../types";

const DefaultButton = (props: DefaultButtonProps) => {
  const { className, text, outlined, block, loading, onClick, icon } = props;
  const defaultButtonStyling: string = " text-white bg-primary hover:bg-underline focus:bg-secondary";
  const defaultIconStyling: string = "stroke-white";
  const outlinedButtonStyling: string =
    "text-primary bg-white border-[2px] border-primary hover:border-underline hover:text-underline focus:text-secondary focus:outline-secondary ";
  const outlinedIconStyling: string = "stroke-primary group-hover:stroke-underline group-focus:stroke-secondary";

  if (loading)
    return (
      <button
        className={`animate-pulse rounded-xl py-0.5 px-7 text-2xl bg-gray-500 text-gray-500 ${
          block ? "w-full" : "w-fit"
        } ${className}`}
      >
        {text}
        {icon && (
          <svg
            width={iconLib[icon].viewBoxWidth || 0}
            height={iconLib[icon].viewBoxHeight || 0}
            stroke="red"
            className="h-min"
          >
            <path>{iconLib[icon].path || ""}</path>
          </svg>
        )}
      </button>
    );

  return (
    <button
      onClick={onClick}
      className={`${
        outlined ? outlinedButtonStyling : defaultButtonStyling
      } rounded-xl py-0.5 px-7 transition-all text-2xl flex flex-row items-center group ${
        block ? "w-full" : "w-fit"
      } ${className}`}
    >
      {text}
      {icon && icon in iconLib && (
        <svg
          viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
          className={`ml-2 h-8 w-8 transition-all fill-none ${outlined ? outlinedIconStyling : defaultIconStyling}`}
        >
          {iconLib[icon].path.map((path) => {
            return <path key={path} d={path} />;
          })}
        </svg>
      )}
    </button>
  );
};

export default DefaultButton;
