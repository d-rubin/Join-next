"use client";

import { useRouter } from "next/navigation";

const SlugPage = () => {
  const router = useRouter();

  router.replace("/");
};

export default SlugPage;
