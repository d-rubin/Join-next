"use client";

import { useState } from "react";
// eslint-disable-next-line import/no-cycle
import DefaultInput from "./Default";
import { PasswordProps } from "../../types";

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
