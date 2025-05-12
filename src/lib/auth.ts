"use client"

import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export function useAuth() {
  const [user, setUser] = useState(auth.currentUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return { user, loading, logout }
}

// Función para establecer una cookie de sesión cuando el usuario inicia sesión
export function setSessionCookie() {
  document.cookie = `admin_session=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
}

// Función para eliminar la cookie de sesión cuando el usuario cierra sesión
export function removeSessionCookie() {
  document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict"
}
