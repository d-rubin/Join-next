"use client";

import { DefaultInputProps } from "./Default";

export type TextareaProps = Omit<DefaultInputProps, "type" | "icon" | "onIconClick">;

const Textarea = (props: TextareaProps) => {
  const {
    name,
    register,
    disabled,
    placeholder,
    label,
    block,
    errorText,
    defaultValue,
    isError = false,
    className,
  } = props;

  return (
    <div className={`flex flex-col justify-start gap-1 ${block ? "w-full" : "w-fit"}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={`flex flex-row flex-nowrap items-center dark:bg-bgDark bg-white rounded-lg py-0.5 px-3 border-2 border-grey focus-within:border-underline ${
          isError ? "border-red" : ""
        }`}
      >
        <textarea
          {...register(name, { value: defaultValue || undefined })}
          placeholder={placeholder}
          aria-disabled={disabled}
          className={`bg-transparent outline-0 placeholder-grey ${block ? "w-full" : ""} ${className}`}
        />
      </div>
      {isError && errorText && <p className="text-xs text-red">{errorText}</p>}
    </div>
  );
};

export default Textarea;
