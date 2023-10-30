"use client";

// @ts-ignore
import { useFormStatus } from "react-dom";
import BigButton from "../buttons/BigButton";

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return <BigButton text={text} className="px-12" loading={pending} />;
};

export default SubmitButton;
