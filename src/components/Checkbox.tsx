"use client";

import { useState } from "react";
import Icon from "./Icon";
import Text from "./Text";

export type CheckboxProps = {
  name: string;
  text: string;
  value?: boolean;
  isError?: boolean;
  errorText?: string;
};

const Checkbox = ({ text, value = false, name, errorText, isError }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(value);

  return (
    <>
      <span onClick={() => setChecked(!checked)} className="flex flex-row gap-2 items-center cursor-pointer">
        <input name={name} type="checkbox" defaultChecked={checked} className="w-0 h-0 hidden" />
        <Icon
          icon={checked ? "checkboxChecked" : "checkboxUnchecked"}
          className="stroke-black"
          iconSize="1rem"
          focusable
        />
        <Text text={text} />
      </span>
      {isError && errorText && <p className="text-xs text-red">{errorText}</p>}
    </>
  );
};

export default Checkbox;
