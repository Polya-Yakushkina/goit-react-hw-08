import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectFilter = state => state.filters.query;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, query) => {
    const cleanQuery = query.replace(/\D/g, "");

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.number.replace(/-/g, "").includes(cleanQuery)
    );
  }
);

// const searchByName = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filter) => {
//     if (!filter) {
//       return contacts;
//     }
//     return contacts.filter((contact) =>
//       contact.name?.toLowerCase().includes(filter.toLowerCase())
//     );
//   }
// );

// const searchByNumber = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filter) => {
//     if (!filter) {
//       return contacts;
//     }
//     const cleanedFilter = filter.replace(/\D/g, "");
//     return contacts.filter((contact) =>
//       contact.number?.replace(/\D/g, "").includes(cleanedFilter)
//     );
//   }
// );

// export const selectFilteredContacts = createSelector(
//   [searchByName, searchByNumber],
//   (contactsByName, contactsByNumber) => {
//     const combinedContacts = [...contactsByName, ...contactsByNumber];
//     const results = combinedContacts.filter(
//       (contact, index, self) =>
//         index === self.findIndex((c) => c.id === contact.id)
//     );
//     return results;
//   }
// );
