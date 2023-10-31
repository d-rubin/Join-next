"use client";

import { KeyboardEvent } from "react";
import clsx from "clsx";
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
    if (event.key === " ") {
      onClick && onClick();
    }
  };

  if (icon in iconLib) {
    const noFill = iconLib[icon].noFill || false;
    return (
      <svg
        viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
        className={clsx(
          `transition-all ${iconSize} ${className}`,
          { "outline-underline": focusable },
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
          return <path key={path} d={path} />;
        })}
      </svg>
    );
  }

  return null;
};

export default Icon;
