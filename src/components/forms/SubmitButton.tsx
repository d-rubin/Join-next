"use client";

// @ts-ignore
import { useFormStatus } from "react-dom";
import BigButton from "../buttons/BigButton";

const SubmitButton = ({
  text,
  icon,
  iconSize,
  className,
}: {
  text: string;
  icon?: string;
  iconSize?: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return <BigButton text={text} className={`px-12 ${className}`} loading={pending} icon={icon} iconSize={iconSize} />;
};

export default SubmitButton;
