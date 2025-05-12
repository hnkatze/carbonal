import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore"
import type { News } from "../../types"

const COLLECTION = "news"

export const getNews = async (): Promise<News[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as News[]
}

export const getNewsById = async (id: string): Promise<News | null> => {
  const docRef = doc(db, COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as News
  } else {
    return null
  }
}

export const addNews = async (news: Omit<News, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), news)
  return docRef.id
}

export const updateNews = async (id: string, news: Partial<News>): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, news)
}

export const deleteNews = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await deleteDoc(docRef)
}
