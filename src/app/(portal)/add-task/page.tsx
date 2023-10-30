import { getContacts } from "../../../helper/fetchApi";
import PagePadding from "../../../components/PagePadding";
import AddTaskFormMobile from "../../../components/forms/AddTask/AddTaskFormMobile";
import AddTaskFormDesktop from "../../../components/forms/AddTask/AddTaskFormDesktop";

const AddTaskPage = async () => {
  const contacts = await getContacts();

  return (
    <PagePadding className="flex flex-col gap-4 relative h-full">
      <h1 className="text-5xl font-bold">Add Task</h1>
      <AddTaskFormMobile contacts={contacts} />
      <AddTaskFormDesktop contacts={contacts} />
    </PagePadding>
  );
};

export default AddTaskPage;
