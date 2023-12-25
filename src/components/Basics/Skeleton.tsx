import { cn } from "src/utils/generalHelper";

const Skeleton = ({ className }: { className?: string }) => {
  return <div className={cn(`h-full w-full animate-pulse bg-gray-400 transition-all`, className)} />;
};

export default Skeleton;
