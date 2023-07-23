import AddTaskForm from "../../../components/AddTasksForm";
import { getContacts } from "../../../helper/fetchApi";

const AddTaskPage = async () => {
  const contacts = await getContacts();

  return (
    <div className="flex flex-col gap-8 max-w-[40rem]">
      <div className="gap-4 flex flex-col md:flex-row md:items-center md:relative md:justify-between md:w-[27rem]">
        <p className="sm:hidden">Kanban Project Management Tool</p>
        <h2 className="text-4xl font-bold">Add Task</h2>
      </div>
      <AddTaskForm contacts={contacts} />
    </div>
  );
};

export default AddTaskPage;
