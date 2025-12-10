import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore"
import { serializeFirestoreData } from "./serialize"
import type { News } from "../../types"

const COLLECTION = "news"

export const getNews = async (): Promise<News[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION))
  return querySnapshot.docs.map((docSnap) =>
    serializeFirestoreData<News>({ id: docSnap.id, ...docSnap.data() })
  )
}

export const getNewsById = async (id: string): Promise<News | null> => {
  const docRef = doc(db, COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return serializeFirestoreData<News>({ id: docSnap.id, ...docSnap.data() })
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
