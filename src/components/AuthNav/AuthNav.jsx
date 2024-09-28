import { NavLink } from "react-router-dom";

import clsx from "clsx";
import css from "./AuthNav.module.css";


export default function AuthNav() {
    return (
        <div className={clsx(css.container)}>
            <NavLink to="/register" className={clsx(css.link)}>
                Register
            </NavLink>
            <NavLink to="/login" className={clsx(css.link)}>
                Log in
            </NavLink>
        </div>
    );
}