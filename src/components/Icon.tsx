import { iconLib } from "../iconlib/iconLib";
import { IconProps } from "../types";

const Icon = ({ icon, iconSize = "h-8 w-8", onClick, className }: IconProps) => {
  if (icon in iconLib) {
    const noFill = iconLib[icon].noFill || false;
    return (
      <svg
        viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
        className={`transition-all ${noFill ? "fill-none" : ""} ${
          onClick ? "cursor-pointer" : ""
        } ${iconSize} ${className}`}
        width={iconSize || undefined}
        height={iconSize || undefined}
        onClick={onClick}
      >
        {iconLib[icon].path.map((path) => {
          return <path key={path} d={path} />;
        })}
      </svg>
    );
  }

  return null;
};

export default Icon;
