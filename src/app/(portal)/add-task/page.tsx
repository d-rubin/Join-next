import AddTaskForm from "../../../components/forms/AddTasksForm";
import { getContacts } from "../../../helper/fetchApi";
import PagePadding from "../../../components/PagePadding";

const AddTaskPage = async () => {
  const contacts = await getContacts();

  return (
    <PagePadding className="flex flex-col gap-4 relative">
      <h1 className="text-5xl font-bold">Add Task</h1>
      <AddTaskForm contacts={contacts} />
    </PagePadding>
  );
};

export default AddTaskPage;
