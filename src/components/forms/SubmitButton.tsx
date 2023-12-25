"use client";

// @ts-ignore
import { useFormStatus } from "react-dom";
import Button from "../Basics/Button";

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

  return (
    <Button className={`px-12 ${className}`} loading={pending} icon={icon} iconSize={iconSize}>
      {text}
    </Button>
  );
};

export default SubmitButton;
