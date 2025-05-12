"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MatchCard from "./match-card"
import { Loader2 } from "lucide-react"
import { getMatchesByStatus } from "@/lib"
import { Match } from "../../types"


export default function CompletedMatches() {
  const [completedMatches, setCompletedMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matches = await getMatchesByStatus("completed")
        setCompletedMatches(matches)
      } catch (error) {
        console.error("Error al cargar partidos completados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-sky-800">Partidos Finalizados</h2>
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        </div>
      </section>
    )
  }

  if (completedMatches.length === 0) {
    return null
  }

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-6 text-sky-800"
        >
          Partidos Finalizados
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedMatches.map((match, index) => (
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
                type="completed"
                winner={match.winner || "draw"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
