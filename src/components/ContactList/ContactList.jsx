import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";

import clsx from "clsx";
import css from "./ContactList.module.css";

export default function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);
  // console.log("Visible Contacts:", visibleContacts);

  return (
    <ul className={clsx(css.list)}>
      {visibleContacts.length === 0 ? (
        <li className={clsx(css.item)}>No contacts found.</li>
      ) : (
        visibleContacts.map((contact) => (
          <li key={contact.id} className={clsx(css.item)}>
            <Contact data={contact} />
          </li>
        ))
      )}
    </ul>
  );
}