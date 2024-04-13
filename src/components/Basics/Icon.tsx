"use client";

import { KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { iconLib } from "../../iconlib/iconLib";
// eslint-disable-next-line import/no-cycle
import { cn } from "../../utils/generalHelper";

export type IconProps = {
  icon: string;
  iconSize?: string;
  onClick?: (() => void) | false;
  className?: string;
};

const Icon = ({ icon, iconSize = "h-6 w-6", onClick = false, className }: IconProps) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event);
    if (event.key === "Enter") {
      onClick && onClick();
    }
  };

  if (icon in iconLib) {
    const noFill = iconLib[icon].noFill || false;
    return (
      <svg
        viewBox={`0 ${iconLib[icon].minY || "0"} ${iconLib[icon].viewBoxWidth || "0"} ${
          iconLib[icon].viewBoxHeight || "0"
        }`}
        className={cn(
          "rounded-md stroke-none outline-none outline-offset-4 transition-all dark:fill-textDark",
          { "fill-none": noFill },
          {
            "cursor-pointer hover:fill-underline focus-visible:outline-underline dark:fill-textDark dark:hover:fill-underline":
              !!onClick,
          },
          iconSize,
          className,
        )}
        width={iconSize || undefined}
        height={iconSize || undefined}
        onClick={onClick || undefined}
        onKeyDown={handleKeyDown}
        tabIndex={onClick ? 0 : -1}
      >
        {iconLib[icon].path.map((path) => {
          return <path key={uuidv4()} d={path} />;
        })}
      </svg>
    );
  }

  return null;
};

export default Icon;
