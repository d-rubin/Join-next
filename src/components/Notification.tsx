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
      className={`fixed left-1/3 w-1/3 -bottom-20 transition-all ease-in-out duration-1000 bg-primary text-white text-xl rounded-2xl px-5 h-16 flex flex-wrap justify-center content-center ${
        triggerTransition ? "bottom-[30%]" : ""
      }`}
    >
      {text}
    </span>
  );
};

export default Notification;
