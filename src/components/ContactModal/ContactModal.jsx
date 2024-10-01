import { useDispatch } from "react-redux";
import { updateContact } from '../../redux/contacts/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { RiCloseFill } from "react-icons/ri";

import clsx from "clsx";
import css from "./ContactModal.module.css";

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-z\s.'-]+$/, "This field must contain only letters, spaces, dots, hyphens and apostrophes") // Додано '.' для точок
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("This field is required"),
    number: Yup.string()
        .matches(/^\d{3}-\d{2}-\d{2}$/, "The number must be in format XXX-XX-XX")
        .required("This field is required"),
});

export default function Modal({ isOpen, onClose, contact }) {
    const dispatch = useDispatch();

    const initialValues = {
        name: contact.name,
        number: contact.number,
    };

    const handleSubmit = (values) => {
    dispatch(updateContact({
      contactId: contact.id,
      updates: {
        name: values.name,
        number: values.number
      }
    }));
    onClose();
  };


    // const handleSubmit = ({ name, number }) => {
    //     const { id } = contact;
    //     dispatch(updateContact({ id, name, number }));
    //     onClose();
    // };
    
    if (!isOpen) return null;
    
    return (
        <div className={css.modalOverlay}>
            <div className={css.modalContent}>
                <button
                    onClick={onClose}
                    className={clsx(css.closeBtn)}>
                    <RiCloseFill />
                </button>
                <h2>Update Contact</h2>
                
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={ContactSchema}
                >
                    <Form className={clsx(css.form)}>
                        <div className={clsx(css.inputContainer)}>
                            <label htmlFor="name" className={clsx(css.text)}>Name</label>
                            <Field
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                className={clsx(css.input)} />
                            
                            <ErrorMessage
                                name="name"
                                component="span"
                                className={clsx(css.error)} />

                            <label htmlFor="number" className={clsx(css.text)}>Number</label>
                            <Field name="number">
                                {({ field }) => (
                                    <MaskedInput
                                        {...field}
                                        mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                        placeholder="XXX-XX-XX"
                                        className={clsx(css.input)}
                                        id="number"
                                    />
                                )}
                            </Field>
                            <ErrorMessage
                                name="number"
                                component="span"
                                className={clsx(css.error)} />
                        </div>

                        <button
                            type="submit"
                            className={clsx(css.btn)}>
                            Update
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
