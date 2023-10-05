"use client";

import { forwardRef, useState } from "react";
import DefaultInput from "./Default";
import { PasswordProps } from "../../types";

const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const [textHidden, setTextHidden] = useState<boolean>(true);

  return (
    <DefaultInput
      type={textHidden ? "password" : "text"}
      icon={textHidden ? "eyeOff" : "eye"}
      onIconClick={() => setTextHidden(false)}
      ref={ref}
      {...props}
    />
  );
});

Password.displayName = "Password";
export default Password;
