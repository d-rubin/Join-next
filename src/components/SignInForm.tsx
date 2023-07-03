"use client";

import Image from "next/image";
import { FormEvent, FormEventHandler, RefObject, useRef, useState } from "react";
import * as process from "process";
import UserIcon from "../img/userIcon.svg";
import EmailIcon from "../img/emailIcon.svg";
import LockIcon from "../img/lockIcon.svg";
import fetchApi from "../helper/fetchApi";

const SignInForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  // const [response, setResponse] = useState<Response>();

  // const handleSubmit = () => {
  //   const json = {
  //     name: usernameRef.current?.value,
  //     password: emailRef.current?.value,
  //     email: emailRef.current?.value,
  //   };
  //
  //   fetchApi("/auth/register/", { body: JSON.stringify(json) }).then((res) => setResponse(res));
  // };

  const handleFocus = (ref: RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };

  return (
    <form action={`${process.env.API_URL}/auth/register/`} method="post" className="flex flex-col gap-8 items-center">
      <div
        onClick={() => handleFocus(usernameRef)}
        className="h-8 w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center"
      >
        <input
          name="name"
          ref={usernameRef}
          type="text"
          placeholder="Username"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
          required
        />
        <Image src={UserIcon} alt="User Icon" className="w-1/12 h-4" />
      </div>
      <div
        onClick={() => handleFocus(emailRef)}
        className="h-8 w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center"
      >
        <input
          name="email"
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
          required
        />
        <Image src={EmailIcon} alt="Email Icon" className="w-1/12 h-4" />
      </div>
      <div
        onClick={() => handleFocus(passwordRef)}
        className="h-8 w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center"
      >
        <input
          name="password"
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
          required
        />
        <Image src={LockIcon} alt="Password Icon" className="w-1/12 h-4" />
      </div>
      <button className="w-40 h-10 px-4 bg-[--color-primary] rounded-lg text-white text-xl">Sign Up</button>
    </form>
  );
};

export default SignInForm;
