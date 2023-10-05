const Text = ({ text, className }: { text: string; className?: string }) => {
  return <p className={`${className}`}>{text}</p>;
};

export default Text;
