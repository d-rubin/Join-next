const SummaryPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="gap-4 flex flex-col sm:flex-row sm:items-center sm:relative sm:justify-between sm:w-[27rem]">
          <p className="sm:hidden">Kanban Project Management Tool</p>
          <h2 className="text-4xl font-bold">Summary</h2>
          <p className="text-xl">Everything in a nutshell!</p>
          <div className="border-[--color-underline] border-2 w-28 sm:w-12 sm:rotate-90 sm:absolute sm:left-40" />
        </div>
        <div className="flex gap-8 flex-col text-center max-w-[40rem]">
          <div className="flex gap-4">
            <div className="w-1/3 bg-white h-36 rounded-3xl">Taks in Board</div>
            <div className="w-1/3 bg-white h-36 rounded-3xl">Tasks in Progress</div>
            <div className="w-1/3 bg-white h-36 rounded-3xl">Awaiting feedback</div>
          </div>
          <div className="w-ful bg-white h-36 rounded-3xl">Urgent</div>
          <div className="flex gap-4">
            <div className="w-1/2 bg-white h-36 rounded-3xl">To-do</div>
            <div className="w-1/2 bg-white h-36 rounded-3xl">Done</div>
          </div>
        </div>
      </div>
      <div className="absolute left-3/4 top-1/2 -translate-y-1/2 hidden xl:block">
        <h4 className="text-2xl">Good morning,</h4>
        <h3 className="text-3xl text-[--color-underline] font-semibold">Name</h3>
      </div>
    </>
  );
};

export default SummaryPage;
