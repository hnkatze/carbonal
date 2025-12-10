"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePlayers, useStaff } from "@/hooks"
import type { Player, StaffMember } from "../../types"

interface TeamSectionProps {
  initialPlayers: Player[]
  initialStaff: StaffMember[]
}

export default function TeamSection({ initialPlayers, initialStaff }: TeamSectionProps) {
  const { data: players = [] } = usePlayers(initialPlayers)
  const { data: staff = [] } = useStaff(initialStaff)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)

  return (
    <section id="equipo" className="py-16 px-4 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-sky-800"
        >
          Nuestro Equipo
        </motion.h2>

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="players">Jugadores</TabsTrigger>
            <TabsTrigger value="staff">Cuerpo Técnico</TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="mt-6">
            {players.length === 0 ? (
              <p className="text-center text-gray-500">No hay jugadores disponibles.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="cursor-pointer group"
                    onClick={() => setSelectedPlayer(player)}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
                      <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-sky-600 opacity-30 z-10">
                        {player.number}
                      </div>
                      <Image
                        src={player.image || "/placeholder.svg"}
                        alt={player.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="text-white font-bold">{player.nickname}</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-center">{player.name}</h3>
                    <p className="text-sm text-gray-600 text-center">{player.position}</p>
                    <div className="flex justify-center mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          player.status === "titular" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {player.status === "titular" ? "Titular" : "Suplente"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="staff" className="mt-6">
            {staff.length === 0 ? (
              <p className="text-center text-gray-500">No hay miembros del cuerpo técnico disponibles.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {staff.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="cursor-pointer group"
                    onClick={() => setSelectedStaff(person)}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-center">{person.name}</h3>
                    <p className="text-sm text-gray-600 text-center">{person.role}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modal para ver jugador */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setSelectedPlayer(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-square">
                    <Image
                      src={selectedPlayer.image || "/placeholder.svg"}
                      alt={selectedPlayer.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-sky-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                      {selectedPlayer.number}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{selectedPlayer.name}</h3>
                    <p className="text-sky-600 text-lg font-medium mb-4">&quot;{selectedPlayer.nickname}&quot;</p>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500 text-sm">Posición:</span>
                        <p className="font-medium">{selectedPlayer.position}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Número:</span>
                        <p className="font-medium">{selectedPlayer.number}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Estado:</span>
                        <p className="font-medium capitalize">{selectedPlayer.status}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPlayer(null)}
                      className="mt-6 w-full py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal para ver staff */}
        <AnimatePresence>
          {selectedStaff && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setSelectedStaff(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video">
                  <Image
                    src={selectedStaff.image || "/placeholder.svg"}
                    alt={selectedStaff.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{selectedStaff.name}</h3>
                  <p className="text-sky-600 text-lg font-medium mb-4">{selectedStaff.role}</p>
                  <button
                    onClick={() => setSelectedStaff(null)}
                    className="mt-2 w-full py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
