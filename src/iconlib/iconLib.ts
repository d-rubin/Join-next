type IconLibProps = {
  [key: string]: {
    viewBoxWidth: number;
    viewBoxHeight: number;
    path: string[];
  };
};

export const iconLib: IconLibProps = {
  check: {
    viewBoxWidth: 24,
    viewBoxHeight: 25,
    path: ["M4 12.5098L10 18.5098L20 6.50977"],
  },
};
