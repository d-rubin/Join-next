import AddTaskForm from "../../../components/forms/AddTasksForm";
import { getContacts } from "../../../helper/fetchApi";
import PagePadding from "../../../components/PagePadding";

const AddTaskPage = async () => {
  const contacts = await getContacts();

  return (
    <PagePadding className="flex flex-col gap-4 relative">
      <div className="gap-4 flex flex-col lg:flex-row lg:items-center lg:relative lg:justify-between">
        <p className="sm:hidden">Kanban Project Management Tool</p>
        <h2 className="text-4xl font-bold">Add Task</h2>
      </div>
      <AddTaskForm contacts={contacts} />
    </PagePadding>
  );
};

export default AddTaskPage;
