"use client";

import { useFormContext } from "react-hook-form";
import Button, { DefaultButtonProps } from "../Basics/Button";

const FormButton = ({ children, type, loading, disabled, onClick, ...restProps }: DefaultButtonProps) => {
  const methods = useFormContext();

  return (
    <Button
      onClick={type === "reset" ? methods.reset : onClick}
      loading={type !== "reset" && methods?.formState?.isSubmitting}
      disabled={type !== "reset" && !methods?.formState?.isValid}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default FormButton;
