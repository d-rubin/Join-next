type DefaultButtonProps = {
  text: string;
  className?: string;
  outlined?: boolean;
};

const DefaultButton = (props: DefaultButtonProps) => {
  const { className, text, outlined } = props;
  const defaultStyling = " text-white bg-primary hover:bg-underline";
  const outlinedStyling =
    "text-primary bg-white border-[2px] border-primary hover:border-underline hover:text-underline";

  return (
    <button
      className={`${
        outlined ? outlinedStyling : defaultStyling
      } w-fit rounded-xl py-0.5 px-7 transition-all text-2xl ${className}`}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
