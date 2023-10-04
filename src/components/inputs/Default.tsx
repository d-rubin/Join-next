"use client";

import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DefaultInputProps } from "../../types";
import Icon from "../Icon";

const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>((props, ref) => {
  const { type, name, icon, placeholder, label, onChange, block, required = false, errorText, maxLength = 30 } = props;
  const { register, getFieldState, formState } = useForm();

  return (
    <div className={`flex flex-col justify-start gap-1 ${block ? "w-full" : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex flex-row flex-nowrap bg-white rounded-lg py-1.5 px-4 border-2 border-grey focus-within:border-underline">
        <input
          {...register(name, { required, maxLength })}
          required={required}
          tabIndex={-1}
          ref={(node) => {
            if (node && typeof ref === "function") {
              ref(node);
            }
          }}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`bg-transparent outline-0 placeholder-grey ${block ? "w-full" : ""}`}
        />
        {icon && <Icon icon={icon} className="fill-grey stroke-1 h-6 w-6" />}
      </div>
      <p className="text-xs text-red">{errorText}</p>
    </div>
  );
});

DefaultInput.displayName = "DefaultInput";

export default DefaultInput;
