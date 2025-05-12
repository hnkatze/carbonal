import { db } from "@/lib/firebase"
import { collection, addDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore"
import type { GalleryImage } from "../../types"

const COLLECTION = "gallery"

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as GalleryImage[]
}

export const getGalleryImageById = async (id: string): Promise<GalleryImage | null> => {
  const docRef = doc(db, COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as GalleryImage
  } else {
    return null
  }
}

export const addGalleryImage = async (image: Omit<GalleryImage, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), image)
  return docRef.id
}

export const deleteGalleryImage = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await deleteDoc(docRef)
}
