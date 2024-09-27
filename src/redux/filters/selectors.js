import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";


export const selectNameFilter = state => state.filters.query;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    const cleanedFilter = filter.replace(/\D/g, "");

    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number?.replace(/\D/g, "").includes(cleanedFilter)
    );
  }
);