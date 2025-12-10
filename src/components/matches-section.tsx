"use client"

import { motion } from "framer-motion"
import MatchCard from "./match-card"
import { useMatchesByStatus } from "@/hooks"
import type { Match, MatchStatus } from "../../types"

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

interface MatchesSectionProps {
  type: MatchStatus
  initialData: Match[]
  title: string
}

export default function MatchesSection({ type, initialData, title }: MatchesSectionProps) {
  const { data: matches = [] } = useMatchesByStatus(type, initialData)

  if (matches.length === 0) {
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
        {title}
      </motion.h3>
      <div className="space-y-4">
        {matches.map((match, index) => (
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
              timeRemaining={type === "upcoming" ? calculateTimeRemaining(match.date || "", match.time || "") : undefined}
              venue={match.venue}
              type={type}
              winner={type === "completed" ? (match.winner || "draw") : undefined}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
