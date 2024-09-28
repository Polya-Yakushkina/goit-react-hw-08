import clsx from "clsx";
import css from "./PageTitle.module.css";

export default function PageTitle({ children }) {
  return <h1 className={clsx(css.heading)}>{children}</h1>;
}