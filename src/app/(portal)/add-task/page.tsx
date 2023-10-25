import { redirect, RedirectType } from "next/navigation";
import { getContacts } from "../../../helper/fetchApi";
import { isUserLoggedIn } from "../../../helper/serverActions";
import PagePadding from "../../../components/PagePadding";
import AddTaskFormMobile from "../../../components/forms/AddTask/AddTaskFormMobile";
import AddTaskFormDesktop from "../../../components/forms/AddTask/AddTaskFormDesktop";

const AddTaskPage = async () => {
  if (!isUserLoggedIn()) return redirect("login", RedirectType.replace);
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
