"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash, ImageIcon, Loader2 } from "lucide-react"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getNews, deleteNews, getMatchesByStatus, deleteMatch, startMatch, finishMatch, getPlayers, getStaff, deletePlayer, deleteStaffMember, getGalleryImages, deleteGalleryImage } from "@/lib"
import { News, Match, Player, StaffMember, GalleryImage } from "../../../../types"

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("news")

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <Link href="/">
          <Button variant="outline">Ver Sitio</Button>
        </Link>
      </div>

      <Tabs defaultValue="news" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="news">Noticias</TabsTrigger>
          <TabsTrigger value="matches">Partidos</TabsTrigger>
          <TabsTrigger value="team">Equipo</TabsTrigger>
          <TabsTrigger value="gallery">Galería</TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <NewsTab />
        </TabsContent>

        <TabsContent value="matches">
          <MatchesTab />
        </TabsContent>

        <TabsContent value="team">
          <TeamTab />
        </TabsContent>

        <TabsContent value="gallery">
          <GalleryTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NewsTab() {
  const router = useRouter()
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews()
        setNews(data)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteNews(id)
      setNews(news.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting news:", error)
      alert("Error al eliminar la noticia")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Administrar Noticias</h3>
        <Button onClick={() => router.push("/admin/news/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Noticia
        </Button>
      </div>

      {news.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No hay noticias. ¡Crea la primera!</p>
      ) : (
        <div className="grid gap-4">
          {news.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {item.images && item.images.length > 0 && (
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/admin/news/${item.id}/edit`)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente la noticia.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => item.id && handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function MatchesTab() {
  const router = useRouter()
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [liveMatches, setLiveMatches] = useState<Match[]>([])
  const [completedMatches, setCompletedMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const upcoming = await getMatchesByStatus("upcoming")
        const live = await getMatchesByStatus("live")
        const completed = await getMatchesByStatus("completed")

        setUpcomingMatches(upcoming)
        setLiveMatches(live)
        setCompletedMatches(completed)
      } catch (error) {
        console.error("Error fetching matches:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteMatch(id)
      setUpcomingMatches(upcomingMatches.filter((match) => match.id !== id))
      setLiveMatches(liveMatches.filter((match) => match.id !== id))
      setCompletedMatches(completedMatches.filter((match) => match.id !== id))
    } catch (error) {
      console.error("Error deleting match:", error)
      alert("Error al eliminar el partido")
    }
  }

  const handleStartMatch = async (id: string) => {
    try {
      await startMatch(id)
      const match = upcomingMatches.find((m) => m.id === id)
      if (match) {
        setUpcomingMatches(upcomingMatches.filter((m) => m.id !== id))
        setLiveMatches([...liveMatches, { ...match, status: "live" }])
      }
    } catch (error) {
      console.error("Error starting match:", error)
      alert("Error al iniciar el partido")
    }
  }

  const handleFinishMatch = async (id: string) => {
    try {
      // Determinar el ganador basado en el marcador
      const match = liveMatches.find((m) => m.id === id)
      if (!match) return

      let winner: "home" | "away" | "draw" = "draw"

      if (match.homeTeam.score !== undefined && match.awayTeam.score !== undefined) {
        if (match.homeTeam.score > match.awayTeam.score) {
          winner = "home"
        } else if (match.homeTeam.score < match.awayTeam.score) {
          winner = "away"
        }
      }

      await finishMatch(id, winner)

      if (match) {
        setLiveMatches(liveMatches.filter((m) => m.id !== id))
        setCompletedMatches([...completedMatches, { ...match, status: "completed", winner }])
      }
    } catch (error) {
      console.error("Error finishing match:", error)
      alert("Error al finalizar el partido")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Partidos</CardTitle>
            <CardDescription>Gestiona los próximos encuentros</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-4" onClick={() => router.push("/admin/matches/new")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Partido
            </Button>
            {upcomingMatches.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No hay próximos partidos</p>
            ) : (
              <div className="space-y-2">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="p-2 border rounded flex justify-between items-center">
                    <span>
                      {match.homeTeam.name} vs {match.awayTeam.name}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => match.id && router.push(`/admin/matches/${match.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-500"
                        onClick={() => match.id && handleStartMatch(match.id)}
                      >
                        Iniciar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminará permanentemente el partido.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => match.id && handleDelete(match.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partidos En Vivo</CardTitle>
            <CardDescription>Actualiza los partidos en curso</CardDescription>
          </CardHeader>
          <CardContent>
            {liveMatches.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No hay partidos en vivo</p>
            ) : (
              <div className="space-y-2">
                {liveMatches.map((match) => (
                  <div key={match.id} className="p-2 border rounded flex justify-between items-center">
                    <span>
                      {match.homeTeam.name} {match.homeTeam.score} - {match.awayTeam.score} {match.awayTeam.name}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => match.id && router.push(`/admin/matches/${match.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-500"
                        onClick={() => match.id && handleFinishMatch(match.id)}
                      >
                        Finalizar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partidos Finalizados</CardTitle>
            <CardDescription>Historial de partidos</CardDescription>
          </CardHeader>
          <CardContent>
            {completedMatches.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No hay partidos finalizados</p>
            ) : (
              <div className="space-y-2">
                {completedMatches.map((match) => (
                  <div key={match.id} className="p-2 border rounded flex justify-between items-center">
                    <span>
                      {match.homeTeam.name} {match.homeTeam.score} - {match.awayTeam.score} {match.awayTeam.name}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => match.id && router.push(`/admin/matches/${match.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminará permanentemente el partido.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => match.id && handleDelete(match.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TeamTab() {
  const router = useRouter()
  const [players, setPlayers] = useState<Player[]>([])
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<"players" | "staff">("players")

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const playersData = await getPlayers()
        const staffData = await getStaff()

        setPlayers(playersData)
        setStaff(staffData)
      } catch (error) {
        console.error("Error fetching team:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeam()
  }, [])

  const handleDeletePlayer = async (id: string) => {
    try {
      await deletePlayer(id)
      setPlayers(players.filter((player) => player.id !== id))
    } catch (error) {
      console.error("Error deleting player:", error)
      alert("Error al eliminar el jugador")
    }
  }

  const handleDeleteStaffMember = async (id: string) => {
    try {
      await deleteStaffMember(id)
      setStaff(staff.filter((member) => member.id !== id))
    } catch (error) {
      console.error("Error deleting staff member:", error)
      alert("Error al eliminar el miembro del cuerpo técnico")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-4">
          <Button
            variant={activeSection === "players" ? "default" : "outline"}
            onClick={() => setActiveSection("players")}
          >
            Jugadores
          </Button>
          <Button variant={activeSection === "staff" ? "default" : "outline"} onClick={() => setActiveSection("staff")}>
            Cuerpo Técnico
          </Button>
        </div>

        {activeSection === "players" ? (
          <Button onClick={() => router.push("/admin/players/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Jugador
          </Button>
        ) : (
          <Button onClick={() => router.push("/admin/staff/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Miembro
          </Button>
        )}
      </div>

      {activeSection === "players" ? (
        players.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No hay jugadores. ¡Añade el primero!</p>
        ) : (
          <div className="grid gap-4">
            {players.map((player) => (
              <Card key={player.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {player.image ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {player.number}
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium">{player.name}</h4>
                      <p className="text-sm text-gray-500">
                        {player.position} - {player.status === "titular" ? "Titular" : "Suplente"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => player.id && router.push(`/admin/players/${player.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará permanentemente el jugador.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => player.id && handleDeletePlayer(player.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : staff.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No hay miembros del cuerpo técnico. ¡Añade el primero!</p>
      ) : (
        <div className="grid gap-4">
          {staff.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {member.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => member.id && router.push(`/admin/staff/${member.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente el miembro del cuerpo técnico.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => member.id && handleDeleteStaffMember(member.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function GalleryTab() {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryImages()
        setImages(data)
      } catch (error) {
        console.error("Error fetching gallery:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const handleDeleteImage = async (id: string) => {
    try {
      await deleteGalleryImage(id)
      setImages(images.filter((image) => image.id !== id))
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Error al eliminar la imagen")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Administrar Galería</h3>
        <Button onClick={() => router.push("/admin/gallery/upload")}>
          <ImageIcon className="mr-2 h-4 w-4" />
          Subir Imágenes
        </Button>
      </div>

      {images.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No hay imágenes en la galería. ¡Sube la primera!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square bg-gray-200 rounded-md overflow-hidden group">
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente la imagen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => image.id && handleDeleteImage(image.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
