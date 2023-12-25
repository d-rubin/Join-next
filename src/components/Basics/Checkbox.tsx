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
      <span onClick={handleClick} className="flex cursor-pointer flex-row items-center gap-2">
        <input
          name={name}
          required={required}
          ref={ref}
          type="checkbox"
          onClick={handleClick}
          checked={checked}
          className="peer/checkbox h-0 w-0"
        />
        <Icon
          icon={checked ? "checkboxChecked" : "checkboxUnchecked"}
          className="rounded-sm stroke-black peer-focus-visible/checkbox:outline-underline dark:fill-transparent dark:stroke-textDark dark:stroke-2"
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
