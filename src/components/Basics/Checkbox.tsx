"use client";

import { forwardRef, useState, KeyboardEvent } from "react";
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === " ") handleClick();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <span
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="group/checkbox flex cursor-pointer flex-row items-center gap-2 outline-none"
      >
        <input
          name={name}
          required={required}
          ref={ref}
          type="checkbox"
          checked={checked}
          className="invisible absolute h-0 w-0"
        />
        <Icon
          icon={checked ? "checkboxChecked" : "checkboxUnchecked"}
          className="rounded-sm stroke-black group-focus-visible/checkbox:outline-underline dark:fill-transparent dark:stroke-textDark dark:stroke-2"
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
