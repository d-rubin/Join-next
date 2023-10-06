import { useState } from "react";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import Icon from "./Icon";
import Text from "./Text";
import { LoginValues } from "./forms/LoginForm";

export type CheckboxProps = {
  name: string;
  text: string;
  register: UseFormRegister<LoginValues>;
  value?: boolean;
  onChange?: () => void;
  required?: boolean;
};

const Checkbox = ({ text, value = false, onChange, register, name, required }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(value);

  const handleClick = () => {
    setChecked(!checked);
    onChange && onChange();
  };

  return (
    <span onClick={handleClick} className="flex flex-row gap-2 items-center cursor-pointer">
      <input
        type="checkbox"
        // @ts-ignore
        {...register(name, { required, value })}
        defaultChecked={checked}
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
  );
};

export default Checkbox;
