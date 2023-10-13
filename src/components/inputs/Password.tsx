"use client";

import { useState } from "react";
import DefaultInput, { DefaultInputProps } from "./Default";

export type PasswordProps = Omit<DefaultInputProps, "icon" | "type" | "onIconClick">;

const Password = (props: PasswordProps) => {
  const [textHidden, setTextHidden] = useState<boolean>(true);

  return (
    <DefaultInput
      type={textHidden ? "password" : "text"}
      icon={textHidden ? "eyeOff" : "eye"}
      onIconClick={() => setTextHidden(!textHidden)}
      {...props}
    />
  );
};

export default Password;
