export interface News {
  id?: string
  title: string
  description: string
  content: string
  date: string
  images: string[]
}

// Tipos para partidos
export type MatchStatus = "upcoming" | "live" | "completed"
export type MatchWinner = "home" | "away" | "draw" | null

export interface Team {
  name: string
  logo: string
  score?: number
  scorers?: string[]
}

export interface Match {
  id?: string
  homeTeam: Team
  awayTeam: Team
  tournament: string
  date?: string
  time?: string
  description?: string
  venue?: string
  status: MatchStatus
  winner?: MatchWinner
}

// Tipos para jugadores
export type PlayerStatus = "titular" | "suplente"
export type PlayerPosition = "Portero" | "Defensa" | "Mediocampista" | "Delantero"

export interface Player {
  id?: string
  name: string
  nickname: string
  number: number
  position: PlayerPosition
  image: string
  status: PlayerStatus
}

// Tipos para cuerpo técnico
export interface StaffMember {
  id?: string
  name: string
  role: string
  image: string
}

// Tipos para galería
export interface GalleryImage {
  id?: string
  src: string
  alt: string
  size: "small" | "medium" | "large"
}
