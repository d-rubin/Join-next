"use client";

import { forwardRef } from "react";
import { DefaultInputProps } from "../../types";
import Icon from "../Icon";

const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>((props, ref) => {
  const { type, name, icon, placeholder, label, onChange, block, required, errorText } = props;

  return (
    <div className={`flex flex-col justify-start ${block ? "w-full" : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex flex-row flex-nowrap bg-white rounded-lg py-1.5 px-4 border-2 border-grey focus-within:border-underline">
        <input
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
      {errorText && <p className="w-full hidden text-xs text-red peer-invalid:block">{errorText}</p>}
    </div>
  );
});

DefaultInput.displayName = "DefaultInput";

export default DefaultInput;
