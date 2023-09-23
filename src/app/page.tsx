"use client";

// import { useRouter } from "next/navigation";

import { useRouter } from "next/navigation";

const RootPage = () => {
  const router = useRouter();

  router.replace("/login");
  return <div className="w-full h-full flex items-center justify-center text-9xl font-bold">404</div>;
};

export default RootPage;
