import ContactEditModal from "../ContactEditModal/ContactEditModal";
import ContactDelModal from "../ContactDelModal/ContactDelModal";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from 'react-icons/ri';
import toast from "react-hot-toast";

import css from "./Contact.module.css";
import clsx from "clsx";

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDelete = () => {
    setDelModalOpen(true);
  }

  const handleConfirmDelete = () => {
    dispatch(deleteContact(id));
    toast.success(`Contact "${name}" has been deleted!`);
    setDelModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDelModalOpen(false);
  };

  const handleEditModal = () => {
    setSelectedContact({ id, name, number });
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
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
          role="button"
        />
        <FaUserEdit
          className={clsx(css.editIcon)}
          onClick={handleEditModal}
          role="button"
        />
      </div>
     {editModalOpen && (
        <ContactEditModal 
          onClose={handleCloseEditModal} 
          contact={selectedContact}
        />
      )}
      {delModalOpen && (
        <ContactDelModal 
          contact={{ id, name, number }} 
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}