import { Toaster } from "react-hot-toast";
import AppBar from "../AppBar/AppBar";


import clsx from "clsx";
import css from "./Layout.module.css";

export default function Layout({ children }) {
    return (
        <div className={clsx(css.container)}>
            <AppBar />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    )
}

