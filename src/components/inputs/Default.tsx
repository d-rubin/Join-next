"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext, UseFormRegister } from "react-hook-form";
import Icon from "../Basics/Icon";
import { cn } from "../../utils/generalHelper";

export type DefaultInputProps = InputHTMLAttributes<HTMLInputElement> & {
  block?: boolean;
  errorText?: string;
  isError?: boolean;
  disabled?: boolean;
  icon?: string;
  label?: string;
  register?: UseFormRegister<any>;
  onIconClick?: (() => void) | false;
};

const DefaultInput = (props: DefaultInputProps) => {
  const {
    block,
    errorText,
    isError = false,
    disabled,
    icon,
    label,
    onIconClick = false,
    className,
    name,
    ...restProps
  } = props;
  const methods = useFormContext();

  return (
    <div className={`flex flex-col justify-start gap-1 dark:text-white ${block ? "w-full" : "w-fit"}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={cn(
          `flex flex-row flex-nowrap items-center rounded-lg border-2 border-grey bg-white px-2 py-1.5 outline-none focus-within:border-underline dark:bg-bgDark`,
          {
            "border-red": isError,
          },
        )}
      >
        <input
          {...(name && methods?.register ? methods.register(name) : undefined)}
          aria-disabled={disabled}
          className={cn(
            `bg-transparent placeholder-grey outline-none outline-0 dark:text-white`,
            { "w-full": block },
            className,
          )}
          {...restProps}
        />
        {icon && (
          <Icon icon={icon} onClick={disabled ? undefined : onIconClick} className="h-5 w-5 fill-grey stroke-1" />
        )}
      </div>
      {isError && errorText && !(name && methods?.formState?.errors[name]) && (
        <p className="text-xs text-red">{errorText}</p>
      )}
      {name && methods?.formState?.errors[name] && !errorText && (
        <p className="text-xs text-red">{methods.formState.errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default DefaultInput;
