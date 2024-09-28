import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import clsx from "clsx";
import css from "./Navigation.module.css";


export default function Navigation() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav className={clsx(css.nav)}>
            <NavLink to="/" className={clsx(css.link)}>
                Home
            </NavLink>
            {isLoggedIn && (
                <NavLink to="/contacts" className={clsx(css.link)}>
                    Contacts
                </NavLink>
            )}
        </nav>
    );
}