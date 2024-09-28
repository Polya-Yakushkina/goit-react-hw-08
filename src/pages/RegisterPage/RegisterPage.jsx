import PageTitle from "../../components/PageTitle/PageTitle";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import clsx from "clsx";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
    return (
        <div className={clsx(css.container)}>
            <PageTitle className={clsx(css.text)}>Register your account</PageTitle>
            <RegistrationForm />
        </div>
    )
}