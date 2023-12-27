"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "./Icon";
import { cn } from "../../utils/generalHelper";

export type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlined?: boolean;
  block?: boolean;
  loading?: boolean;
  icon?: string;
  bold?: boolean;
  iconSize?: string;
  disabled?: boolean;
};

const Button = (props: DefaultButtonProps) => {
  const {
    children,
    onClick,
    className,
    disabled = false,
    outlined,
    block,
    loading,
    icon,
    iconSize,
    bold,
    ...restProps
  } = props;
  const methods = useFormContext();

  if ((props.type !== "reset" && methods?.formState?.isSubmitting) || loading)
    return (
      <button
        className={cn(
          "pointer-events-none flex h-12 animate-pulse flex-row items-center justify-center gap-2 rounded-xl border-2 border-gray-400 bg-gray-400 px-7 py-0.5 text-gray-400 focus:outline-none",
          block ? "w-full" : "w-fit",
          className,
        )}
        {...restProps}
      >
        {children}
        {icon && <Icon icon={icon} iconSize={iconSize} className="fill-none dark:fill-none" />}
      </button>
    );

  if (disabled || (props.type !== "reset" && !methods?.formState?.isValid))
    return (
      <button
        aria-disabled={disabled}
        tabIndex={-1}
        className={`pointer-events-none flex h-12 cursor-default flex-row items-center justify-center gap-2 rounded-xl border-2 bg-gray-200 fill-gray-500 stroke-gray-500 px-7 py-0.5 text-gray-500 dark:bg-bgDark dark:fill-textDark dark:stroke-textDark dark:text-textDark ${
          block ? "w-full" : "w-fit"
        }
         ${className}`}
        {...restProps}
      >
        {children}
        {icon && <Icon icon={icon} iconSize={iconSize} />}
      </button>
    );

  if (outlined)
    return (
      <button
        onClick={props.type === "reset" ? methods.reset : onClick}
        className={cn(
          "group/button flex h-12 flex-row items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white px-7 py-0.5 text-primary outline-none outline-offset-4 transition-all hover:border-underline hover:text-underline hover:drop-shadow-lg focus-visible:outline-underline active:scale-90 dark:bg-gray-300",
          bold && "font-semibold",
          block ? "w-full" : "w-fit",
          className,
        )}
        {...restProps}
      >
        {children}
        {icon && <Icon icon={icon} iconSize={iconSize} className="fill-primary group-hover/button:fill-underline" />}
      </button>
    );

  return (
    <button
      onClick={props.type === "reset" ? methods.reset : onClick}
      className={cn(
        "group/button flex h-12 flex-row items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-primary px-7 py-0.5 text-white outline-none outline-offset-4 transition-all hover:bg-underline hover:drop-shadow-lg focus-visible:outline-underline active:scale-90 group-focus/button:bg-secondary",
        bold && "font-semibold",
        block ? "w-full" : "w-fit",
        className,
      )}
      {...restProps}
    >
      {children}
      {icon && <Icon icon={icon} iconSize={iconSize} className="fill-white" />}
    </button>
  );
};

export default Button;
