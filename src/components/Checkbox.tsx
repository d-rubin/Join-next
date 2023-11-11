"use client";

import { forwardRef, useState } from "react";
import Icon from "./Icon";
import Text from "./Text";

export type CheckboxProps = {
  name: string;
  text: string;
  required?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
  errorText?: string;
  isError?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { name, required, text, value = false, onChange, errorText, isError } = props;
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
          ref={ref}
          type="checkbox"
          onChange={handleClick}
          checked={checked}
          className="w-0 h-0 peer"
        />
        <Icon
          icon={checked ? "checkboxChecked" : "checkboxUnchecked"}
          className="stroke-black peer-focus:outline-underline peer-focus:outline-2 rounded-sm"
          iconSize="1rem"
        />
        <Text text={text} />
      </span>
      {isError && errorText && <p className="text-xs text-red">{errorText}</p>}
    </>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
