import initDB from "./initDB";


export const saveFileToDB = async (file,userEmail) => {
  const db = await initDB();
  const fileData = {
    id: userEmail, // Use the file name as the unique key
    content: file, // Store the file content as is (Blob/File)
  };
  await db.put('files', fileData);
  console.log(`File "${file.name}" saved to IndexedDB.`);
};