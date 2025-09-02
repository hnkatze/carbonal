"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MatchCard from "./match-card"

import { Loader2 } from "lucide-react"
import { Match } from "../../types"
import { getMatchesByStatus } from "@/lib"

// Función para calcular el tiempo restante
const calculateTimeRemaining = (dateStr: string, timeStr: string): string => {
  if (!dateStr) return ""

  const [year, month, day] = dateStr.split("-").map(Number)
  const [hours, minutes] = timeStr ? timeStr.split(":").map(Number) : [12, 0]

  const matchDate = new Date(year, month - 1, day, hours, minutes)
  const now = new Date()

  const diffTime = matchDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Hoy"
  if (diffDays === 1) return "Mañana"
  if (diffDays < 0) return "Fecha pasada"
  return `${diffDays} días`
}

export default function UpcomingMatches() {
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matches = await getMatchesByStatus("upcoming")
        setUpcomingMatches(matches)
      } catch (error) {
        console.error("Error al cargar próximos partidos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4 text-sky-800">Próximos Partidos</h3>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        </div>
      </div>
    )
  }

  if (upcomingMatches.length === 0) {
    return null
  }

  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-xl font-bold mb-4 text-sky-800"
      >
        Próximos Partidos
      </motion.h3>
      <div className="space-y-4">
        {upcomingMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <MatchCard
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              tournament={match.tournament}
              date={match.date}
              time={match.time}
              description={match.description}
              timeRemaining={calculateTimeRemaining(match.date || "", match.time || "")}
              venue={match.venue}
              type="upcoming"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
