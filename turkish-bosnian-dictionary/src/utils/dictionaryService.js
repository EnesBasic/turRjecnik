import { db } from '../firebase'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'

const dictionaryRef = collection(db, 'dictionary')

export const addWord = async (wordData) => {
  try {
    await addDoc(dictionaryRef, {
      ...wordData,
      createdAt: new Date().toISOString()
    })
    return true
  } catch (error) {
    console.error("Error adding word: ", error)
    return false
  }
}

export const getWords = async () => {
  try {
    const q = query(dictionaryRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error getting words: ", error)
    return []
  }
}