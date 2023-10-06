import DefaultButton, { DefaultButtonProps } from "./Default";

const BigButton = (props: DefaultButtonProps) => {
  const { className } = props;
  return <DefaultButton {...props} className={`h-14 ${className}`} />;
};

export default BigButton;
