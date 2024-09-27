import ContactModal from "../ContactModal/ContactModal";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from 'react-icons/ri';

import css from "./Contact.module.css";
import clsx from "clsx";

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={clsx(css.container)}>
      <div className={clsx(css.card)}>
        <p className={clsx(css.text)}>
          <IoPerson className={clsx(css.icon)} /> {name}
        </p>
        <p className={clsx(css.text)}>
          <FaPhoneAlt className={clsx(css.icon)} /> {number}
        </p>
      </div>
      <div className={clsx(css.iconWrapper)}>
        <RiDeleteBin6Line
          className={clsx(css.deleteIcon)}
          onClick={handleDelete}
        />
        <FaUserEdit
          className={clsx(css.editIcon)}
          onClick={handleOpenModal}
        />
      </div>
     {isModalOpen && (
        <ContactModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          contact={{ id, name, number }}
        />
      )}
    </div>
  );
}