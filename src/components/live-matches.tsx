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
      <section id="partidos" className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-sky-800">Partidos En Vivo</h2>
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        </div>
      </section>
    )
  }

  if (liveMatches.length === 0) {
    return null
  }

  return (
    <section id="partidos" className="py-8 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-6 text-sky-800"
        >
          Partidos En Vivo
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>
  )
}
