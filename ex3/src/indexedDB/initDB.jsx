import { openDB } from 'idb';

const initDB = async () => {
  const db = await openDB('myFilesDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' }); // KeyPath is a unique identifier
      }
    },
  });
  return db;
};

export default initDB;
