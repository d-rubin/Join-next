const Text = ({ text, className }: { text: string; className?: string }) => {
  return <p className={`cursor-default ${className}`}>{text}</p>;
};

export default Text;
