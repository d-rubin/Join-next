"use client";

import Text from "./Text";
import Icon from "./Icon";

type PrioProps = {
  prio: "urgent" | "medium" | "low";
  setPrio: (prio: "high" | "medium" | "low") => void;
  active: boolean;
};

const Prio = (props: PrioProps) => {
  const { prio, setPrio, active } = props;

  if (prio === "urgent")
    return (
      <button
        type="button"
        className={`w-full justify-center flex flex-row items-center gap-2 outline-none border-2 focus:shadow-md hover:shadow-lg transition-all rounded-lg p-2 cursor-pointer ${
          active ? "bg-red border-red" : "bg-white border-grey  dark:bg-bgDark"
        }`}
        onClick={() => setPrio("high")}
      >
        <Text text="Urgent" className={active ? "text-white" : ""} />
        <Icon
          icon="urgent"
          className={`${active ? "stroke-white fill-white" : "stroke-red fill-red"}`}
          iconSize="h-4 w-4"
        />
      </button>
    );

  if (prio === "medium")
    return (
      <button
        type="button"
        className={`w-full justify-center flex flex-row items-center gap-2 outline-none border-2 focus:shadow-md hover:shadow-lg transition-all rounded-lg p-2 cursor-pointer ${
          active ? "bg-orange border-orange" : "bg-white border-grey  dark:bg-bgDark"
        }`}
        onClick={() => setPrio("medium")}
      >
        <Text text="Medium" className={active ? "text-white" : ""} />
        <Icon
          icon="urgent"
          className={`${active ? "stroke-white fill-white" : "stroke-orange fill-orange"}`}
          iconSize="h-4 w-4"
        />
      </button>
    );

  return (
    <button
      type="button"
      className={`w-full justify-center flex flex-row items-center gap-2 outline-none border-2 focus:shadow-md hover:shadow-lg transition-all rounded-lg p-2 cursor-pointer ${
        active ? "bg-green border-green" : "bg-white border-grey dark:bg-bgDark"
      }`}
      onClick={() => setPrio("low")}
    >
      <Text text="Low" className={active ? "text-white" : ""} />
      <Icon
        icon="urgent"
        className={`${active ? "stroke-white fill-white" : "stroke-green fill-green"}`}
        iconSize="h-4 w-4"
      />
    </button>
  );
};

export default Prio;
