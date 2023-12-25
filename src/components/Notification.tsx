"use client";

import { useEffect, useState } from "react";

const Notification = ({ text, trigger }: { text: string; trigger: boolean }) => {
  const [triggerTransition, setTriggerTransition] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setTriggerTransition(true), 10);
    setTimeout(() => setTriggerTransition(false), 1300);
  }, [trigger]);

  return (
    <span
      className={`fixed -bottom-20 left-1/3 flex h-16 w-1/3 flex-wrap content-center justify-center rounded-2xl bg-primary px-5 text-xl text-white transition-all duration-1000 ease-in-out ${
        triggerTransition ? "bottom-[30%]" : ""
      }`}
    >
      {text}
    </span>
  );
};

export default Notification;
