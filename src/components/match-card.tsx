import Image from "next/image"
import { cn } from "@/lib/utils"

export type MatchType = "upcoming" | "live" | "completed"

export interface MatchCardProps {
  homeTeam: {
    name: string
    logo: string
    score?: number
    scorers?: string[]
  }
  awayTeam: {
    name: string
    logo: string
    score?: number
    scorers?: string[]
  }
  tournament: string
  date?: string
  time?: string
  description?: string
  timeRemaining?: string
  venue?: string
  type: MatchType
  winner?: "home" | "away" | "draw"
}

export default function MatchCard({
  homeTeam,
  awayTeam,
  tournament,
  date,
  time,
  description,
  timeRemaining,
  venue,
  type,
  winner,
}: MatchCardProps) {
  // Formatear fecha para mostrar
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split("-")
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
                   "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    return `${day} ${months[parseInt(month) - 1]} ${year}`
  }

  // Formatear hora para mostrar
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return ""
    const [hours, minutes] = timeStr.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden border-l-4 h-full flex flex-col",
        type === "live" && "border-red-500",
        type === "upcoming" && "border-sky-500",
        type === "completed" && winner === "home" && "border-green-500",
        type === "completed" && winner === "away" && "border-yellow-500",
        type === "completed" && winner === "draw" && "border-gray-500",
      )}
    >
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-500">{tournament}</span>
          {type === "live" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <span className="w-2 h-2 mr-1 bg-red-500 rounded-full animate-pulse"></span>
              En Vivo
            </span>
          )}
          {type === "upcoming" && timeRemaining && (
            <span className="text-sm font-medium text-sky-600">{timeRemaining}</span>
          )}
          {type === "completed" && <span className="text-sm font-medium text-gray-500">Finalizado</span>}
        </div>

        <div className="flex justify-between items-center flex-1">
          <div className="flex flex-col items-center text-center w-2/5">
            <div className="relative w-16 h-16 mb-2">
              <Image src={homeTeam.logo || "/placeholder.svg"} alt={homeTeam.name} fill className="object-contain" />
            </div>
            <h3 className="font-bold text-sm">{homeTeam.name}</h3>
            {(type === "live" || type === "completed") && (
              <div className="mt-1">
                <span className="text-2xl font-bold">{homeTeam.score}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center w-1/5">
            <span className="text-xl font-bold">vs</span>
          </div>

          <div className="flex flex-col items-center text-center w-2/5">
            <div className="relative w-16 h-16 mb-2">
              <Image src={awayTeam.logo || "/placeholder.svg"} alt={awayTeam.name} fill className="object-contain" />
            </div>
            <h3 className="font-bold text-sm">{awayTeam.name}</h3>
            {(type === "live" || type === "completed") && (
              <div className="mt-1">
                <span className="text-2xl font-bold">{awayTeam.score}</span>
              </div>
            )}
          </div>
        </div>

        {/* Fecha y hora para partidos próximos */}
        {type === "upcoming" && (
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <div className="text-sm font-medium text-gray-700">
              {formatDate(date)}
            </div>
            <div className="text-sm text-gray-600">
              {formatTime(time)}
            </div>
            {venue && <div className="text-xs text-gray-500 mt-1">📍 {venue}</div>}
          </div>
        )}

        {/* Scorers for live and completed matches */}
        {(type === "live" || type === "completed") && (
          <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 min-h-[60px]">
            <div className="flex justify-between">
              <div className="w-[45%] text-left">
                {homeTeam.scorers?.map((scorer, index) => (
                  <div key={`home-${index}`}>⚽ {scorer}</div>
                ))}
              </div>
              <div className="w-[10%]"></div>
              <div className="w-[45%] text-right">
                {awayTeam.scorers?.map((scorer, index) => (
                  <div key={`away-${index}`}>{scorer} ⚽</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
