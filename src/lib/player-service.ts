import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from "firebase/firestore"
import { Player, PlayerStatus, StaffMember } from "../../types"


const PLAYER_COLLECTION = "players"
const STAFF_COLLECTION = "staff"

// Player services
export const getPlayers = async (): Promise<Player[]> => {
  const querySnapshot = await getDocs(collection(db, PLAYER_COLLECTION))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Player[]
}

export const getPlayersByStatus = async (status: PlayerStatus): Promise<Player[]> => {
  const q = query(collection(db, PLAYER_COLLECTION), where("status", "==", status))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Player[]
}

export const getPlayerById = async (id: string): Promise<Player | null> => {
  const docRef = doc(db, PLAYER_COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Player
  } else {
    return null
  }
}

export const addPlayer = async (player: Omit<Player, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, PLAYER_COLLECTION), player)
  return docRef.id
}

export const updatePlayer = async (id: string, player: Partial<Player>): Promise<void> => {
  const docRef = doc(db, PLAYER_COLLECTION, id)
  await updateDoc(docRef, player)
}

export const deletePlayer = async (id: string): Promise<void> => {
  const docRef = doc(db, PLAYER_COLLECTION, id)
  await deleteDoc(docRef)
}

// Staff services
export const getStaff = async (): Promise<StaffMember[]> => {
  const querySnapshot = await getDocs(collection(db, STAFF_COLLECTION))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as StaffMember[]
}

export const getStaffMemberById = async (id: string): Promise<StaffMember | null> => {
  const docRef = doc(db, STAFF_COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as StaffMember
  } else {
    return null
  }
}

export const addStaffMember = async (staffMember: Omit<StaffMember, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, STAFF_COLLECTION), staffMember)
  return docRef.id
}

export const updateStaffMember = async (id: string, staffMember: Partial<StaffMember>): Promise<void> => {
  const docRef = doc(db, STAFF_COLLECTION, id)
  await updateDoc(docRef, staffMember)
}

export const deleteStaffMember = async (id: string): Promise<void> => {
  const docRef = doc(db, STAFF_COLLECTION, id)
  await deleteDoc(docRef)
}
