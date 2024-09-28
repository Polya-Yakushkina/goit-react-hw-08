import { Formik, Form, Field } from 'formik';
import { useDispatch } from "react-redux";
import { logIn } from '../../redux/auth/operations';

import clsx from "clsx";
import css from "./LoginForm.module.css";


export default function LoginForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        console.log(values);
        dispatch(logIn(values));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form autoComplete="off">
                <label>
                    Email
                    <Field type="email" name="email" />
                </label>
                <label>
                    Password
                    <Field type="password" name="password" />
                </label>
                <button type="submit">
                    Log In
                </button>
            </Form>
        </Formik>
    );
}
