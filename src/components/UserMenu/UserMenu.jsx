import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";

import clsx from "clsx";
import css from "./UserMenu.module.css";


export default function UserMenu() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    return (
        <div className={clsx(css.container)}>
            <p className={clsx(css.text)}>Welcome, {user.name}</p>
            <button
                type="button"
                onClick={() => dispatch(logOut())}
                className={clsx(css.btn)}
            >
                Logout
            </button>
        </div>
    )
}