// src/firebase/firebaseStorage.js
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload file
export const uploadFile = async (file, userId) => {
  const storageRef = ref(storage, `uploads/${userId}/${file.name}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("File upload failed:", error);
  }
};
