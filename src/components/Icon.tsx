"use client";

import { KeyboardEvent } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { iconLib } from "../iconlib/iconLib";

export type IconProps = {
  icon: string;
  iconSize?: string;
  onClick?: () => void;
  className?: string;
  focusable?: boolean;
};

const Icon = ({ icon, iconSize = "h-6 w-6", onClick, className, focusable = false }: IconProps) => {
  const handleKeyDown = (event: KeyboardEvent) => {
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
        className={clsx(
          `transition-all ${iconSize} ${className}`,
          { "outline-none": !focusable },
          { "fill-none": noFill },
          {
            "cursor-pointer": !!onClick,
          },
        )}
        width={iconSize || undefined}
        height={iconSize || undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={focusable ? 0 : -1}
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
