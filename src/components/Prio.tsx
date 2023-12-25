"use client";

import Text from "./Basics/Text";
import Icon from "./Basics/Icon";

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
        className={`flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border-2 p-2 outline-none transition-all hover:shadow-lg focus:shadow-md ${
          active ? "border-red bg-red" : "border-grey bg-white  dark:bg-bgDark"
        }`}
        onClick={() => setPrio("high")}
      >
        <Text text="Urgent" className={active ? "text-white" : ""} />
        <Icon
          icon="urgent"
          className={`${active ? "fill-white stroke-white" : "fill-red stroke-red"}`}
          iconSize="h-4 w-4"
        />
      </button>
    );

  if (prio === "medium")
    return (
      <button
        type="button"
        className={`flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border-2 p-2 outline-none transition-all hover:shadow-lg focus:shadow-md ${
          active ? "border-orange bg-orange" : "border-grey bg-white  dark:bg-bgDark"
        }`}
        onClick={() => setPrio("medium")}
      >
        <Text text="Medium" className={active ? "text-white" : ""} />
        <Icon
          icon="urgent"
          className={`${active ? "fill-white stroke-white" : "fill-orange stroke-orange"}`}
          iconSize="h-4 w-4"
        />
      </button>
    );

  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border-2 p-2 outline-none transition-all hover:shadow-lg focus:shadow-md ${
        active ? "border-green bg-green" : "border-grey bg-white dark:bg-bgDark"
      }`}
      onClick={() => setPrio("low")}
    >
      <Text text="Low" className={active ? "text-white" : ""} />
      <Icon
        icon="urgent"
        className={`${active ? "fill-white stroke-white" : "fill-green stroke-green"}`}
        iconSize="h-4 w-4"
      />
    </button>
  );
};

export default Prio;
