import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from "firebase/firestore"
import { Match, MatchStatus } from "../../types"


const COLLECTION = "matches"

export const getMatches = async (): Promise<Match[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION))
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Match[]
}

export const getMatchesByStatus = async (status: MatchStatus): Promise<Match[]> => {
  const q = query(collection(db, COLLECTION), where("status", "==", status))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Match[]
}

export const getMatchById = async (id: string): Promise<Match | null> => {
  const docRef = doc(db, COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Match
  } else {
    return null
  }
}

export const addMatch = async (match: Omit<Match, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), match)
  return docRef.id
}

export const updateMatch = async (id: string, match: Partial<Match>): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, match)
}

export const deleteMatch = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await deleteDoc(docRef)
}

export const startMatch = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, { status: "live" })
}

export const finishMatch = async (id: string, winner: Match["winner"]): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, {
    status: "completed",
    winner,
  })
}

export const updateScore = async (
  id: string,
  homeScore: number,
  awayScore: number,
  homeScorers: string[] = [],
  awayScorers: string[] = [],
): Promise<void> => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, {
    "homeTeam.score": homeScore,
    "awayTeam.score": awayScore,
    "homeTeam.scorers": homeScorers,
    "awayTeam.scorers": awayScorers,
  })
}
