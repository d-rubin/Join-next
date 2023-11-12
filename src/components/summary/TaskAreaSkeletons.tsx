import Skeleton from "../Skeleton";

const TaskAreaSkeletons = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-screen-sm">
      <div className="flex flex-row gap-4 w-full h-32">
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
      <div className="flex flex-row gap-4 h-32">
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
