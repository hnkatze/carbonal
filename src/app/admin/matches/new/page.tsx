"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/image-upload"

import { Loader2 } from "lucide-react"
import { MatchStatus } from "../../../../../types"
import { addMatch, uploadImage } from "@/lib"


export default function NewMatchPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    homeTeam: {
      name: "",
      logo: "",
      score: 0,
      scorers: [] as string[],
    },
    awayTeam: {
      name: "",
      logo: "",
      score: 0,
      scorers: [] as string[],
    },
    tournament: "",
    date: "",
    time: "",
    description: "",
    venue: "",
    status: "upcoming" as MatchStatus,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as MatchStatus }))
  }

  const handleHomeLogoChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      homeTeam: {
        ...prev.homeTeam,
        logo: url,
      },
    }))
  }

  const handleAwayLogoChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      awayTeam: {
        ...prev.awayTeam,
        logo: url,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.homeTeam.name || !formData.awayTeam.name || !formData.tournament) {
      alert("Por favor, completa todos los campos obligatorios")
      return
    }

    try {
      setIsSubmitting(true)

      // Preparar datos según el estado del partido
      const matchData = { ...formData }

      if (matchData.status === "live" || matchData.status === "completed") {
        matchData.homeTeam.score = 0
        matchData.homeTeam.scorers = []
        matchData.awayTeam.score = 0
        matchData.awayTeam.scorers = []
      }

      await addMatch(matchData)
      router.push("/admin/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error al crear el partido:", error)
      alert("Ocurrió un error al crear el partido")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Partido</CardTitle>
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
                    value={formData.homeTeam.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <ImageUpload value={formData.homeTeam.logo} onChange={handleHomeLogoChange} onUpload={uploadImage} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Equipo Visitante</h3>
                <div className="space-y-2">
                  <Label htmlFor="awayTeam.name">Nombre</Label>
                  <Input
                    id="awayTeam.name"
                    name="awayTeam.name"
                    value={formData.awayTeam.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <ImageUpload value={formData.awayTeam.logo} onChange={handleAwayLogoChange} onUpload={uploadImage} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tournament">Torneo / Liga</Label>
              <Input id="tournament" name="tournament" value={formData.tournament} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Lugar</Label>
              <Input id="venue" name="venue" value={formData.venue} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
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
                "Guardar Partido"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
