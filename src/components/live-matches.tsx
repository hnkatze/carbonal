"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MatchCard from "./match-card"

import { Loader2 } from "lucide-react"
import { Match } from "../../types"
import { getMatchesByStatus } from "@/lib"


export default function LiveMatches() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matches = await getMatchesByStatus("live")
        setLiveMatches(matches)
      } catch (error) {
        console.error("Error al cargar partidos en vivo:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4 text-sky-800">Partidos En Vivo</h3>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        </div>
      </div>
    )
  }

  if (liveMatches.length === 0) {
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
        Partidos En Vivo
      </motion.h3>
      <div className="space-y-4">
        {liveMatches.map((match, index) => (
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
              type="live"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
