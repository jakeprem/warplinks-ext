import Dexie, { Table, type Transaction } from "dexie";
import { Backend, Link } from "./types";

const DB_NAME = "warplinks-dexie";

export class WarplinksDexie extends Dexie {
  links!: Table<Link>;

  constructor(dbName: string) {
    super(dbName);
    this.version(1).stores({
      links: "key", // primary key and indexed props
    });
  }
}

export const db = new WarplinksDexie(DB_NAME);

db.on("populate", async (transaction: Transaction) => {
  return await Promise.all(
    [
      {
        key: "gh",
        name: "GitHub",
        description: "Open GitHub",
        destination: "https://github.com",
      },
      {
        key: "gl",
        name: "GitLab",
        description: "Open GitLab",
        destination: "https://gitlab.com",
      },
      {
        key: "yt",
        name: "YouTube",
        description: "Open YouTube",
        destination: "https://youtube.com",
      },
      {
        key: "cal",
        name: "Google Calendar",
        description: "Open Google Calendar",
        destination: "https://calendar.google.com",
      },
      {
        key: "mail",
        name: "Gmail",
        description: "Open Gmail",
        destination: "https://mail.google.com",
      },
    ].map(async (link) => await transaction.table("links").add(link))
  );
});

export const DexieBackend: Backend = {
  async get(key: string): Promise<Link | null> {
    return (await db.links.get({ key })) || null;
  },

  async set(link: Link): Promise<void> {
    await db.table("links").put(link);
  },

  async delete(key: string): Promise<void> {
    await db.table("links").delete(key);
  },

  async list(): Promise<Link[]> {
    return await db.table("links").toArray();
  },

  async listCompletions(text: string): Promise<Link[]> {
    // const linkPromise = db.links.get(text);

    const linksPromise = db.links
      .where("key")
      .startsWithIgnoreCase(text)
      .toArray();

    const links = await linksPromise;

    return links;
    // return await Promise.all([linkPromise, linksPromise]).then(
    //   ([link, links]) => {
    //     console.log("Link: ", link);
    //     console.log("Links: ", links);
    //     return link ? [link, ...links] : links;
    //   }
    // );
  },

  async resolve(entry: string): Promise<string | null> {
    const link = await db.table("links").get(entry);
    return link ? link.destination : null;
  },
};

// export class DexieBackend implements Backend {
//   async get(key: string): Promise<Link | null> {
//     return (await db.links.get({ key })) || null;
//   }

//   async set(link: Link): Promise<void> {
//     await db.table("links").put(link);
//   }

//   async delete(key: string): Promise<void> {
//     await db.table("links").delete(key);
//   }

//   async list(): Promise<Link[]> {
//     return await db.table("links").toArray();
//   }

//   async listCompletions(text: string): Promise<Link[]> {
//     return await db.links.where("key").startsWithIgnoreCase(text).toArray();
//   }

//   async resolve(entry: string): Promise<string | null> {
//     const link = await db.table("links").get(entry);
//     return link ? link.url : null;
//   }
// }
