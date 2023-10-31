import { RefObject, useState } from "react";
import Icon from "./Icon";
import Text from "./Text";

export type CheckboxProps = {
  name: string;
  text: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  required?: boolean;
  ref?: RefObject<HTMLInputElement>;
  isError?: boolean;
  errorText?: string;
};

const Checkbox = ({ text, value = false, onChange, name, required, ref, errorText, isError }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(value);

  const handleClick = () => {
    setChecked(!checked);
    onChange && onChange(!checked);
  };

  return (
    <>
      <span onClick={handleClick} className="flex flex-row gap-2 items-center cursor-pointer">
        <input
          name={name}
          required={required}
          type="checkbox"
          defaultChecked={checked}
          ref={ref}
          className="w-0 h-0 hidden"
        />
        <Icon
          icon={checked ? "checkboxChecked" : "checkboxUnchecked"}
          className="stroke-black"
          iconSize="1rem"
          focusable
          onClick={handleClick}
        />
        <Text text={text} />
      </span>
      {isError && errorText && <p className="text-xs text-red">{errorText}</p>}
    </>
  );
};

export default Checkbox;
