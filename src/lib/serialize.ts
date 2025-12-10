import { Timestamp } from "firebase/firestore"

/**
 * Serializa un objeto de Firestore para que sea compatible con Server Components.
 * Convierte Timestamps a strings ISO y elimina métodos.
 */
export function serializeFirestoreData<T>(data: Record<string, unknown>): T {
  const serialized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      serialized[key] = value.toDate().toISOString()
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      serialized[key] = serializeFirestoreData(value as Record<string, unknown>)
    } else {
      serialized[key] = value
    }
  }

  return serialized as T
}
