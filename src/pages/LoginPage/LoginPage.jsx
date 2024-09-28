import PageTitle from "../../components/PageTitle/PageTitle";
import LoginForm from "../../components/LoginForm/LoginForm";

import clsx from "clsx";
import css from "./LoginPage.module.css";


export default function LoginPage() {
    return (
        <div className={clsx(css.container)}>
            <PageTitle className={clsx(css.text)}>Please log in</PageTitle>
            <LoginForm />
        </div>
    )
}