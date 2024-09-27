import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import css from "./App.module.css";
import clsx from "clsx";


export default function App() {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className={clsx(css.title)}>Phonebook</h1>
      <div className={clsx(css.main)}>
        <div className={clsx(css.container)}>
          <ContactForm className={clsx(css.form)} />
          <SearchBox className={clsx(css.box)} />
      </div>
      <div className={clsx(css.list)}>
        {!loading && !error && <ContactList />}
      </div>
          
      {loading && <Loader />}
      {error && <Error />}
      </div>
      
    </div>
  )
}