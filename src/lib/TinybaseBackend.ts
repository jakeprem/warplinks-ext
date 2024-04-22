// import { createQueries, createStore } from "tinybase/with-schemas";
// import { Store } from "tinybase/store";
// import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db";

// import { Backend, Link } from "./types";

// const initStore = () => {
//   const store = createStore().setTablesSchema({
//     links: {
//       // should match row id
//       key: { type: "string" },
//       name: { type: "string" },
//       description: { type: "string" },
//       url: { type: "string" },
//     },
//   });

//   const persister = createIndexedDbPersister(store as Store, "warplinks-store");

//   const queries = createQueries(store);

//   return { store, persister, queries };
// };

// const { store, persister, queries } = initStore();
// persister.load();

// export const TinybaseBackend: Backend = {
//   get(key: string): Link | null {
//     const result = store.getRow("links", key);

//     if (Object.keys(result).length === 0) {
//       return Promise.resolve(null);
//     } else {
//       return Promise.resolve(result);
//     }
//   },

//   set(link: Link): void {
//     if (!link.key) {
//       throw new Error("Link key is required");
//     }

//     store.setRow("links", link.key, link);

//     persister.save();
//   },

//   delete(key: string): void {
//     store.delRow("links", key);

//     persister.save();
//   },

//   list(): Link[] {
//     return Object.values(store.getTable("links"));
//   },

//   listCompletions(text: string): Link[] {
//     queries.setQueryDefinition(
//       "autoCompleteLink",
//       "links",
//       ({ select, where }) => {
//         select("key");
//         select("url");
//         select("description");
//         select("name");
//         where((getCell) => getCell("key")?.startsWith(text) || false);
//       }
//     );

//     return Object.values(queries.getResultTable("autoCompleteLink"));
//   },

//   resolve(entry) {
//     const [key, ...rest] = entry.split("/");
//     const link = this.get(key);

//     console.log("key: ", key, "rest: ", rest);

//     if (!link) {
//       return null;
//     }

//     return link.url || null;
//   },
// };
