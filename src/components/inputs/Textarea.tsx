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
        className={`flex flex-row flex-nowrap items-center rounded-lg border-2 border-grey bg-white px-3 py-0.5 focus-within:border-underline dark:bg-bgDark ${
          isError ? "border-red" : ""
        }`}
      >
        <textarea
          {...register(name, { value: defaultValue || undefined })}
          placeholder={placeholder}
          aria-disabled={disabled}
          className={`bg-transparent placeholder-grey outline-0 ${block ? "w-full" : ""} ${className}`}
        />
      </div>
      {isError && errorText && <p className="text-xs text-red">{errorText}</p>}
    </div>
  );
};

export default Textarea;
