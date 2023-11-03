import clsx from "clsx";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Icon from "../Icon";

export type DefaultInputProps = {
  type: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  block?: boolean;
  errorText?: string;
  defaultValue?: string;
  isError?: boolean;
  disabled?: boolean;
  icon?: string;
  placeholder?: string;
  label?: string;
  onIconClick?: () => void;
  className?: string;
};

const DefaultInput = (props: DefaultInputProps) => {
  const {
    type,
    register,
    name,
    block,
    errorText,
    defaultValue,
    isError = false,
    disabled,
    icon,
    placeholder,
    label,
    onIconClick,
    className,
  } = props;

  return (
    <div className={`flex flex-col justify-start gap-1 ${block ? "w-full" : "w-fit"}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={clsx(
          `flex flex-row flex-nowrap items-center bg-white rounded-lg px-2 py-1.5 border-2 border-grey focus-within:border-underline`,
          {
            "border-red": isError,
          },
        )}
      >
        <input
          {...register(name)}
          type={type}
          aria-disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={clsx(`bg-transparent outline-0 placeholder-grey`, { "w-full": block }, { className })}
        />
        {icon && (
          <Icon icon={icon} onClick={disabled ? undefined : onIconClick} className="fill-grey stroke-1 h-5 w-5" />
        )}
      </div>
      {isError && errorText && <p className="text-xs text-red">{errorText}</p>}
    </div>
  );
};

export default DefaultInput;
