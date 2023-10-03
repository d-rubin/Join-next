import DefaultButton from "./Default";
import { BigButtonProps } from "../../types";

const BigButton = (props: BigButtonProps) => {
  const { className, bold } = props;
  return <DefaultButton {...props} className={`h-14 ${bold && "font-semibold"} ${className}`} />;
};

export default BigButton;
