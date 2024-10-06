import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectUser } from "../../redux/auth/selectors";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";

import clsx from "clsx";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const user = useSelector(selectUser);

    const firstName = user?.name?.split(" ")[0];

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <>
            <PageTitle className={clsx(css.title)}>
                {firstName ? `${firstName}'s Phonebook` : "Your Phonebook"}
            </PageTitle>
            <div className={clsx(css.main)}>
                <div className={clsx(css.container)}>
                    <ContactForm />
                    <SearchBox />
                </div>
                <div className={clsx(css.list)}>
                    {!loading && !error && <ContactList />}
                </div>
                
                {loading && <Loader />}
                {error && <Error />}
            </div>            
        </>
    );
}
