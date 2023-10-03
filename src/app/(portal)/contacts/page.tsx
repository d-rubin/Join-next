"use client";

import { useEffect, useRef, useState } from "react";
import { getContacts } from "../../../helper/fetchApi";
import { Contact } from "../../../types";

const SummaryPage = () => {
  const [contacts, setContacts] = useState<Contact[]>();
  // const [showDetails, setShowDetails] = useState<boolean>();
  // const [contactDetails, setContactDetails] = useState<User>();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    getContacts().then((res) => {
      setContacts(res);
    });
  }, []);

  // const openContactDetails = (contact: User) => {
  //   setShowDetails(true);
  //   setContactDetails(contact);
  // };

  const renderContacts = () => {
    return (
      contacts &&
      contacts.map((contact) => {
        return (
          <div
            key={contact.id}
            className="cursor-pointer hover:bg-primary hover:text-white transition-all p-4 rounded-xl"
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
    <>
      <dialog ref={dialogRef} />
      <div className="max-w-[40rem]">
        <div className="w-full md:w-3/6 md:max-w-[20rem] bg-white p-8 flex flex-col gap-4 absolute left-0 top-20 bottom-0 border-t-2 min-h-full overflow-y-auto">
          {contacts && renderContacts()}
        </div>
        <h2 className="text-4xl font-bold">Contacts</h2>
      </div>
    </>
  );
};

export default SummaryPage;
