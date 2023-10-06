import { KeyboardEvent } from "react";
import { iconLib } from "../iconlib/iconLib";

export type IconProps = {
  icon: string;
  iconSize?: string;
  onClick?: () => void;
  className?: string;
  focusable?: boolean;
};

const Icon = ({ icon, iconSize = "h-8 w-8", onClick, className, focusable = false }: IconProps) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === " ") {
      onClick && onClick();
    }
  };

  if (icon in iconLib) {
    const noFill = iconLib[icon].noFill || false;
    return (
      <svg
        viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
        className={`transition-all ${focusable ? "outline-underline" : "outline-none"} ${noFill ? "fill-none" : ""} ${
          onClick ? "cursor-pointer" : ""
        } ${iconSize} ${className}`}
        width={iconSize || undefined}
        height={iconSize || undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={focusable ? 0 : -1}
      >
        {iconLib[icon].path.map((path) => {
          return <path key={path} d={path} />;
        })}
      </svg>
    );
  }

  return null;
};

// @ts-ignore
export default Icon;
