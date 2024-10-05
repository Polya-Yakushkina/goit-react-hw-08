import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectFilter = state => state.filters.query;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, query) => {
    return contacts.filter(contact => {
      const matchesName = contact.name.toLowerCase().includes(query.toLowerCase());
      const matchesNumber = contact.number.replace(/-/g, "").includes(query);
      return matchesName || matchesNumber;
    });
  }
);
