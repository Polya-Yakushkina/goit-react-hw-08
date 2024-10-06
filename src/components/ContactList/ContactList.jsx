import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import { selectContacts } from "../../redux/contacts/selectors";
import toast from "react-hot-toast";
import { useEffect } from "react";

import clsx from "clsx";
import css from "./ContactList.module.css";

export default function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);
  const allContacts = useSelector(selectContacts);

  useEffect(() => {
    if (allContacts.length > 0 && visibleContacts.length === 0) {
      toast.error("No contacts found.");
    }
  }, [allContacts.length, visibleContacts.length]);

  if (allContacts.length === 0) {
    return <p className={clsx(css.text)}>There're no contacts yet. Please add your first contact!</p>;
  }

  return (
    <ul className={clsx(css.list)}>
      {visibleContacts.map((contact) => (
        <li key={contact.id} className={clsx(css.item)}>
          <Contact data={contact} />
        </li>
      ))}
    </ul>
  );
}