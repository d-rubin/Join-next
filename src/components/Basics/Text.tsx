import { cn } from "../../utils/generalHelper";

const Text = ({ text, className }: { text: string; className?: string }) => {
  return <p className={cn("dark:text-textDark", className)}>{text}</p>;
};

export default Text;
