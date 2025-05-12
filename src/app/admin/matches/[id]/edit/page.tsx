"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/image-upload"

import { Loader2 } from "lucide-react"
import { Match, MatchStatus, MatchWinner } from "../../../../../../types"
import { getMatchById, updateMatch, uploadImage } from "@/lib"


export default function EditMatchPage({ params }: {  params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [match, setMatch] = useState<Match | null>(null)

  useEffect(() => {

    const fetchMatch = async () => {
      try {
        const { id } = await params
        const data = await getMatchById(id)
        if (data) {
          setMatch(data)
        } else {
          alert("Partido no encontrado")
          router.push("/admin/dashboard")
        }
      } catch (error) {
        console.error("Error al cargar el partido:", error)
        alert("Error al cargar el partido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatch()
  }, [params, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!match) return

    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setMatch((prev) => {
        if (!prev) return prev;
        const parentValue = prev[parent as keyof typeof prev];
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value,
            },
          };
        }
        return { ...prev };
      });
    } else {
      setMatch((prev) => {
        if (!prev) return prev
        return { ...prev, [name]: value }
      })
    }
  }

  const handleStatusChange = (value: string) => {
    if (!match) return
    setMatch((prev) => {
      if (!prev) return prev
      return { ...prev, status: value as MatchStatus }
    })
  }

  const handleWinnerChange = (value: string) => {
    if (!match) return
    setMatch((prev) => {
      if (!prev) return prev
      return { ...prev, winner: value as MatchWinner }
    })
  }

  const handleHomeLogoChange = (url: string) => {
    if (!match) return
    setMatch((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        homeTeam: {
          ...prev.homeTeam,
          logo: url,
        },
      }
    })
  }

  const handleAwayLogoChange = (url: string) => {
    if (!match) return
    setMatch((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        awayTeam: {
          ...prev.awayTeam,
          logo: url,
        },
      }
    })
  }

  const handleScoreChange = (team: "home" | "away", value: string) => {
    if (!match) return
    const score = Number.parseInt(value) || 0

    setMatch((prev) => {
      if (!prev) return prev

      if (team === "home") {
        return {
          ...prev,
          homeTeam: {
            ...prev.homeTeam,
            score,
          },
        }
      } else {
        return {
          ...prev,
          awayTeam: {
            ...prev.awayTeam,
            score,
          },
        }
      }
    })
  }

  const handleScorersChange = (team: "home" | "away", value: string) => {
    if (!match) return
    const scorers = value.split("\n").filter(Boolean)

    setMatch((prev) => {
      if (!prev) return prev

      if (team === "home") {
        return {
          ...prev,
          homeTeam: {
            ...prev.homeTeam,
            scorers,
          },
        }
      } else {
        return {
          ...prev,
          awayTeam: {
            ...prev.awayTeam,
            scorers,
          },
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!match) return

    if (!match.homeTeam.name || !match.awayTeam.name || !match.tournament) {
      alert("Por favor, completa todos los campos obligatorios")
      return
    }

    try {
      setIsSubmitting(true)

      // Asegurarse de que los equipos tengan score y scorers si el partido está en vivo o finalizado
      const matchData = { ...match }

      if (matchData.status === "live" || matchData.status === "completed") {
        if (matchData.homeTeam.score === undefined) matchData.homeTeam.score = 0
        if (!matchData.homeTeam.scorers) matchData.homeTeam.scorers = []
        if (matchData.awayTeam.score === undefined) matchData.awayTeam.score = 0
        if (!matchData.awayTeam.scorers) matchData.awayTeam.scorers = []
      }

      // Si el partido está finalizado, asegurarse de que tenga un ganador
      if (matchData.status === "completed" && !matchData.winner) {
        const homeScore = matchData.homeTeam.score || 0
        const awayScore = matchData.awayTeam.score || 0

        if (homeScore > awayScore) {
          matchData.winner = "home"
        } else if (awayScore > homeScore) {
          matchData.winner = "away"
        } else {
          matchData.winner = "draw"
        }
      }
      const { id } = await params
      await updateMatch(id, matchData)
      router.push("/admin/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error al actualizar el partido:", error)
      alert("Ocurrió un error al actualizar el partido")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  if (!match) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Partido no encontrado</p>
        <Button onClick={() => router.push("/admin/dashboard")} className="mt-4">
          Volver al Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Editar Partido</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Equipo Local</h3>
                <div className="space-y-2">
                  <Label htmlFor="homeTeam.name">Nombre</Label>
                  <Input
                    id="homeTeam.name"
                    name="homeTeam.name"
                    value={match.homeTeam.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <ImageUpload value={match.homeTeam.logo} onChange={handleHomeLogoChange} onUpload={uploadImage} />
                </div>

                {(match.status === "live" || match.status === "completed") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="homeScore">Goles</Label>
                      <Input
                        id="homeScore"
                        type="number"
                        min="0"
                        value={match.homeTeam.score || 0}
                        onChange={(e) => handleScoreChange("home", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homeScorers">Goleadores (uno por línea)</Label>
                      <Textarea
                        id="homeScorers"
                        rows={3}
                        value={match.homeTeam.scorers?.join("\n") || ""}
                        onChange={(e) => handleScorersChange("home", e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Equipo Visitante</h3>
                <div className="space-y-2">
                  <Label htmlFor="awayTeam.name">Nombre</Label>
                  <Input
                    id="awayTeam.name"
                    name="awayTeam.name"
                    value={match.awayTeam.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <ImageUpload value={match.awayTeam.logo} onChange={handleAwayLogoChange} onUpload={uploadImage} />
                </div>

                {(match.status === "live" || match.status === "completed") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="awayScore">Goles</Label>
                      <Input
                        id="awayScore"
                        type="number"
                        min="0"
                        value={match.awayTeam.score || 0}
                        onChange={(e) => handleScoreChange("away", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="awayScorers">Goleadores (uno por línea)</Label>
                      <Textarea
                        id="awayScorers"
                        rows={3}
                        value={match.awayTeam.scorers?.join("\n") || ""}
                        onChange={(e) => handleScorersChange("away", e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tournament">Torneo / Liga</Label>
              <Input id="tournament" name="tournament" value={match.tournament} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" name="date" type="date" value={match.date || ""} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input id="time" name="time" type="time" value={match.time || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Lugar</Label>
              <Input id="venue" name="venue" value={match.venue || ""} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={match.description || ""}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={match.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Próximo</SelectItem>
                    <SelectItem value="live">En Vivo</SelectItem>
                    <SelectItem value="completed">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {match.status === "completed" && (
                <div className="space-y-2">
                  <Label htmlFor="winner">Resultado</Label>
                  <Select value={match.winner || ""} onValueChange={handleWinnerChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un resultado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Victoria Local</SelectItem>
                      <SelectItem value="away">Victoria Visitante</SelectItem>
                      <SelectItem value="draw">Empate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
