import { Suspense } from "react";
import PagePadding from "../../../components/PagePadding";
import SummaryTaskArea from "../../../components/SummaryTaskArea";
import TaskAreaSkeletons from "../../../components/loading/TaskAreaSkeletons";

const SummaryPage = async () => {
  return (
    <PagePadding className="flex flex-col items-center gap-4 sm:gap-8 xl:items-start">
      <div className="flex w-full max-w-screen-sm cursor-default flex-col items-center justify-start gap-2 lg:flex-row lg:gap-4">
        <h1 className="text-5xl font-bold dark:text-textDark">Join 360</h1>
        <p className="dark:text-textDark lg:hidden">Key Metrics at a Glance</p>
        <div className="w-20 border-b-2 border-underline lg:hidden" />
        <div className="hidden h-10 border-l-2 border-underline lg:block" />
        <p className="hidden text-xl dark:text-textDark lg:block">Key Metrics at a Glance</p>
      </div>
      <Suspense fallback={<TaskAreaSkeletons />}>
        <SummaryTaskArea />
      </Suspense>
    </PagePadding>
  );
};

export default SummaryPage;
