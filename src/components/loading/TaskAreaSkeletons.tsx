import Skeleton from "../Basics/Skeleton";

const TaskAreaSkeletons = () => {
  return (
    <div className="flex w-full max-w-screen-sm flex-col gap-4">
      <div className="flex h-32 w-full flex-row gap-4">
        <div className="w-1/2">
          <Skeleton className="rounded-3xl" />
        </div>
        <div className="w-1/2">
          <Skeleton className="rounded-3xl" />
        </div>
      </div>
      <div className="block h-32">
        <Skeleton className="rounded-3xl" />
      </div>
      <div className="flex h-32 flex-row gap-4">
        <div className="w-1/3">
          <Skeleton className="rounded-3xl" />
        </div>
        <div className="w-1/3">
          <Skeleton className="rounded-3xl" />
        </div>
        <div className="w-1/3">
          <Skeleton className="rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default TaskAreaSkeletons;
