import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export const addWord = async (wordData) => {
  try {
    const docRef = await addDoc(collection(db, 'dictionary'), {
      ...wordData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding word: ", error);
    return { success: false, error };
  }
};

export const getWords = async () => {
  try {
    const q = query(collection(db, 'dictionary'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting words: ", error);
    return [];
  }
};