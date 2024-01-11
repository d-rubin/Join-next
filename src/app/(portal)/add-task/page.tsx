import { Metadata } from "next";
import { getContacts } from "../../../utils/serverActions";
import PagePadding from "../../../components/PagePadding";
import AddTaskFormMobile from "../../../components/forms/AddTask/AddTaskFormMobile";
import AddTaskFormDesktop from "../../../components/forms/AddTask/AddTaskFormDesktop";
import Text from "../../../components/Basics/Text";

export const metadata: Metadata = {
  title: "Add Task",
};

const AddTaskPage = async () => {
  const contacts = await getContacts();

  if (!Array.isArray(contacts))
    return (
      <div className="flex h-full w-full items-center justify-center p-4 text-3xl">
        <Text text="Ups, Something went wrong! Try again." />
      </div>
    );

  // Todo: Create Loading page
  return (
    <PagePadding className="relative flex h-full flex-col gap-4 dark:text-textDark">
      <h1 className="text-5xl font-bold">Add Task</h1>
      <AddTaskFormMobile contacts={contacts} />
      <AddTaskFormDesktop contacts={contacts} />
    </PagePadding>
  );
};

export default AddTaskPage;
