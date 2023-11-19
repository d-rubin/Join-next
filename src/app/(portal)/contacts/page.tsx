"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getContacts } from "../../../helper/fetchApi";
import { Contact } from "../../../types";
import PagePadding from "../../../components/PagePadding";

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
            key={uuidv4()}
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
    <div className="flex flex-row overflow-hidden">
      <dialog ref={dialogRef} />
      <div className="w-full lg:max-w-[30rem] bg-white p-8 flex flex-col gap-4border-t-2 min-h-full overflow-y-auto overflow-x-hidden">
        {contacts && renderContacts()}
      </div>
      <PagePadding>
        <h2 className="text-5xl font-bold">Contacts</h2>
      </PagePadding>
    </div>
  );
};

export default SummaryPage;
