import { iconLib } from "../iconlib/iconLib";

const Icon = ({ icon, iconSize = "h-8 w-8", className }: { icon: string; iconSize?: string; className?: string }) => {
  if (icon in iconLib) {
    const fill = iconLib[icon].noFill || false;
    return (
      <svg
        viewBox={`0 0 ${iconLib[icon].viewBoxWidth || "0"} ${iconLib[icon].viewBoxHeight || "0"}`}
        className={`ml-2 transition-all ${!fill ? "" : "stroke-2  fill-none"} ${iconSize} ${className}`}
        width={iconSize || undefined}
        height={iconSize || undefined}
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
