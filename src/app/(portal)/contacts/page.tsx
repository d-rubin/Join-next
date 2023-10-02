"use client";

import { useEffect, useState } from "react";
import { User } from "../../../interface";
import { getContacts } from "../../../helper/fetchApi";

const SummaryPage = () => {
  const [contacts, setContacts] = useState<User[]>();

  useEffect(() => {
    getContacts().then((res) => {
      setContacts(res);
    });
  }, []);

  const renderContacts = () => {
    return (
      contacts &&
      contacts.map((contact) => {
        return (
          <div
            key={contact.id}
            className="cursor-pointer hover:bg-[--color-primary] hover:text-white hoverAnimation p-4 rounded-xl"
          >
            <span className="text-xl">{contact.username}</span>
            <br />
            <span className="text-blue-400">{contact.email}</span>
          </div>
        );
      })
    );
  };

  return (
    <div className="max-w-[40rem]">
      <div className="w-full md:w-3/6 md:max-w-[20rem] bg-white p-8 flex flex-col gap-4 absolute left-0 top-20 bottom-0 border-t-2 min-h-full overflow-y-auto">
        {contacts && renderContacts()}
      </div>
      <h2 className="text-4xl font-bold">Contacts</h2>
    </div>
  );
};

export default SummaryPage;
