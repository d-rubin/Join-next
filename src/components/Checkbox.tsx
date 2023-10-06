import { useState } from "react";
import Icon from "./Icon";
import Text from "./Text";

const Checkbox = ({ text, value = false, onChange }: { text: string; value?: boolean; onChange?: () => void }) => {
  const [checked, setChecked] = useState<boolean>(value);

  const handleOnClick = () => {
    setChecked(!checked);
    onChange && onChange();
  };

  return (
    <span onClick={handleOnClick} className="flex flex-row gap-2 items-center cursor-pointer">
      <input type="checkbox" defaultChecked={checked} className="w-0 h-0" tabIndex={-1} />
      <Icon icon={checked ? "checkboxChecked" : "checkboxUnchecked"} className="stroke-black" iconSize="1rem" />
      <Text text={text} />
    </span>
  );
};

export default Checkbox;
