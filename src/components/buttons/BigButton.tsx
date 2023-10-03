import DefaultButton from "./Default";
import { DefaultButtonProps } from "../../types";

const BigButton = (props: DefaultButtonProps) => {
  const { className } = props;
  return <DefaultButton {...props} className={`h-14 ${className}`} />;
};

export default BigButton;
