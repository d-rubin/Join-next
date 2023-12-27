"use client";

import { useFormContext } from "react-hook-form";
import { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/generalHelper";

const Select = ({
  defaultValue,
  name,
  label,
  options,
}: {
  defaultValue?: string;
  label: string;
  options: [key: string, value: string][];
} & SelectHTMLAttributes<HTMLSelectElement>) => {
  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <p>{label}</p>
      <select
        {...(name && methods.register(name, { value: defaultValue }))}
        className={cn(
          `w-full rounded-lg border-2 border-outline bg-white px-1.5 py-1.5 outline-none focus:border-underline dark:bg-bgDark`,
          {
            "border-red": name && !!methods?.formState?.errors[name],
          },
        )}
      >
        {options.map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      {name && methods?.formState?.errors[name] && (
        <p className="text-xs text-red">{methods?.formState?.errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default Select;
