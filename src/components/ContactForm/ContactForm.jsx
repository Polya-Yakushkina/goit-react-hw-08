import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import toast from "react-hot-toast";

import clsx from "clsx";
import css from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-z\s.'-]+$/, "This field must contain only letters, spaces, dots, hyphens and apostrophes")
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("This field is required"),
    number: Yup.string()
        .matches(/^\d{3}-\d{2}-\d{2}$/, "The number must be in format XXX-XX-XX")
        .required("This field is required"),
});

const initialValues = {
    name: "",
    number: "",
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const existingContact = contacts.find(contact =>
      contact.name === values.name || contact.number === values.number);
    
    if (existingContact) {
      const message = existingContact.name === values.name
        ? `Contact ${values.name} already exists in your phonebook!`
        : `Number ${values.number} already belongs to contact ${existingContact.name}!`;
      toast.error(message);
      actions.setSubmitting(false);
      return;
    }

    dispatch(addContact({
        name: values.name,
        number: values.number
    }));
    toast.success(`Contact ${values.name} has been added to your phonebook!`);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={clsx(css.form)}>
        <div className={clsx(css.inputContainer)}> 
          <label htmlFor="name" className={clsx(css.text)}>Name</label>
          <Field className={clsx(css.input)} id="name" type="text" name="name" />
          <ErrorMessage name="name" component="span" className={clsx(css.error)} />

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
          <ErrorMessage name="number" component="span" className={clsx(css.error)} />
        </div>
        
        <button type="submit" className={clsx(css.btn)}>Add</button>
      </Form>
    </Formik>
  );
}