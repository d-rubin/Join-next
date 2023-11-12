const Skeleton = ({ className }: { className?: string }) => {
  return <div className={`w-full h-full transition-all animate-pulse bg-gray-400 ${className}`} />;
};

export default Skeleton;
