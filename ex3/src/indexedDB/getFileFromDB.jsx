import initDB from './initDB';

export const getFileFromDB = async (userEmail) => {
  const db = await initDB();
  const file = await db.get('files', userEmail);
  return file;
};