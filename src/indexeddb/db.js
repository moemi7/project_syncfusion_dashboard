import { openDB } from 'idb';

const DB_NAME = 'dailyBlogDB';
const STORE_NAME = 'blogs';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'timestamp' });
      }
    },
  });
};

export const saveEntry = async (entry) => {
  const db = await initDB();
  await db.add(STORE_NAME, entry);
};

export const getAllEntries = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
