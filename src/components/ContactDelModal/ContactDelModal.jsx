import clsx from "clsx";
import css from "./ContactDelModal.module.css";

export default function ContactDelModal({ contact, onConfirm, onCancel }) {
  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <p className={css.modalText}>
          Delete the contact "{contact.name}"?
        </p>
        <div className={css.buttonGroup}>
          <button
            className={clsx(css.modalBtn, css.confirmBtn)}
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className={clsx(css.modalBtn, css.cancelBtn)}
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
