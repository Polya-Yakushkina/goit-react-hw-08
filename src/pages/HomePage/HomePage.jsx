import PageTitle from "../../components/PageTitle/PageTitle";

import clsx from "clsx";
import css from "./HomePage.module.css";

export default function HomePage() {
    return (
        <div className={clsx(css.container)}>
            <PageTitle>
                Your Phonebook welcome page {" "}
            </PageTitle>
            <span role="img" aria-label="Greeting icon">
                💁‍♀️
            </span>
        </div>
    )
}