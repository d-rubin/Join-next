import { iconLib } from "../iconlib/iconLib";

const Icon = ({ icon, iconSize = "h-8 w-8", className }: { icon: string; iconSize?: string; className?: string }) => {
  if (icon in iconLib)
    return (
      <svg
        viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
        className={`ml-2 transition-all ${iconLib[icon].fill ? undefined : "fill-none"} ${iconSize} ${className}`}
        width={iconSize || undefined}
        height={iconSize || undefined}
      >
        {iconLib[icon].path.map((path) => {
          return (
            <path key={path} d={path} fill={iconLib[icon].fill ? "text-inherit" : undefined} className="stroke-2" />
          );
        })}
      </svg>
    );

  return null;
};

export default Icon;
