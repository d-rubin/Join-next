import { Suspense } from "react";
import PagePadding from "../../../components/PagePadding";
import SummaryTaskArea from "../../../components/summary/SummaryTaskArea";
import TaskAreaSkeletons from "../../../components/summary/TaskAreaSkeletons";

const SummaryPage = async () => {
  return (
    <PagePadding className="gap-6 flex flex-col items-center xl:items-start">
      <div className="flex flex-col w-full max-w-screen-sm gap-2 lg:gap-4 lg:flex-row items-center justify-start cursor-default">
        <h1 className="text-5xl font-bold dark:text-textDark">Join 360</h1>
        <p className="lg:hidden dark:text-textDark">Key Metrics at a Glance</p>
        <div className="border-b-2 border-underline w-20 lg:hidden" />
        <div className="border-l-2 border-underline h-10 hidden lg:block" />
        <p className="hidden lg:block text-xl dark:text-textDark">Key Metrics at a Glance</p>
      </div>
      <Suspense fallback={<TaskAreaSkeletons />}>
        <SummaryTaskArea />
      </Suspense>
    </PagePadding>
  );
};

export default SummaryPage;
