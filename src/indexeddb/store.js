// db.js
import { openDB } from 'idb';

const DB_NAME = 'myAppDB';
const STORE_NAME = 'users';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const addUser = async (user) => {
  const db = await initDB();
  await db.put(STORE_NAME, user); // upserts
};

export const getUser = async (id) => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

export const getAllUsers = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
