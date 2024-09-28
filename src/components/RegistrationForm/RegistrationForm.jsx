import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

import clsx from "clsx";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        console.log(values);
        dispatch(register(values));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form autoComplete="off">
                <label>
                    Username
                    <Field type="text" name="name" />
                </label>
                <label>
                    Email
                    <Field type="email" name="email" />
                </label>
                <label>
                    Password
                    <Field type="password" name="password" />
                </label>
                <button type="submit">Register</button>
            </Form>
        </Formik>
    );
}
