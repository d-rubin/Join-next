import { redirect, RedirectType } from "next/navigation";

const SlugPage = () => {
  redirect("/", RedirectType.replace);
};

export default SlugPage;
