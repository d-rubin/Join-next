"use client";

import { UseFormRegister } from "react-hook-form/dist/types/form";
import { ChangeEvent } from "react";
import { FieldValues } from "react-hook-form";
import Icon from "../Icon";

export type DefaultInputProps = {
  type: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  block?: boolean;
  required?: boolean;
  errorText?: string;
  isError?: boolean;
  maxLength?: number;
  icon?: string;
  placeholder?: string;
  label?: string;
  onIconClick?: () => void;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
};

const DefaultInput = (props: DefaultInputProps) => {
  const {
    type,
    name,
    icon,
    register,
    placeholder,
    label,
    onChange,
    block,
    required = false,
    errorText,
    maxLength = 30,
    isError = false,
    onIconClick,
  } = props;

  return (
    <div className={`flex flex-col justify-start gap-1 ${block ? "w-full" : "w-fit"}`}>
      {label && <label htmlFor={name as unknown as string}>{label}</label>}
      <div
        className={`flex flex-row flex-nowrap items-center bg-white rounded-lg py-0.5 px-3 border-2 border-grey focus-within:border-underline ${
          isError ? "border-red" : ""
        }`}
      >
        <input
          {...register(name, { maxLength, required, onChange })}
          type={type}
          placeholder={placeholder}
          className={`bg-transparent outline-0 placeholder-grey ${block ? "w-full" : ""}`}
        />
        {icon && <Icon icon={icon} onClick={onIconClick} className="fill-grey stroke-1 h-5 w-5" />}
      </div>
      {isError && errorText && <p className="text-xs text-red">{errorText}</p>}
    </div>
  );
};

export default DefaultInput;
