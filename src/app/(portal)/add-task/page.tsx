import { Metadata } from "next";
import { getContacts } from "../../../utils/fetchApi";
import PagePadding from "../../../components/PagePadding";
import AddTaskFormMobile from "../../../components/forms/AddTask/AddTaskFormMobile";
import AddTaskFormDesktop from "../../../components/forms/AddTask/AddTaskFormDesktop";

export const metadata: Metadata = {
  title: "Add Task",
};

const AddTaskPage = async () => {
  const contacts = await getContacts();

  return (
    <PagePadding className="relative flex h-full flex-col gap-4 dark:text-textDark">
      <h1 className="text-5xl font-bold">Add Task</h1>
      <AddTaskFormMobile contacts={contacts} />
      <AddTaskFormDesktop contacts={contacts} />
    </PagePadding>
  );
};

export default AddTaskPage;
