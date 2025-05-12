"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MultiImageUpload from "@/components/multi-image-upload"
import { Loader2 } from "lucide-react"
import { addGalleryImage, uploadImage } from "@/lib"


export default function UploadGalleryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [imageDetails, setImageDetails] = useState<{
    alt: string
    size: "small" | "medium" | "large"
  }>({
    alt: "",
    size: "medium",
  })

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageDetails((prev) => ({ ...prev, alt: e.target.value }))
  }

  const handleSizeChange = (value: string) => {
    setImageDetails((prev) => ({ ...prev, size: value as "small" | "medium" | "large" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      alert("Por favor, sube al menos una imagen")
      return
    }

    try {
      setIsSubmitting(true)

      // Guardar cada imagen con sus detalles
      const promises = images.map((src) =>
        addGalleryImage({
          src,
          alt: imageDetails.alt || "Imagen de El Carbonal FC",
          size: imageDetails.size,
        }),
      )

      await Promise.all(promises)
      router.push("/admin/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error al subir las imágenes:", error)
      alert("Ocurrió un error al subir las imágenes")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Subir Imágenes a la Galería</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Imágenes</Label>
              <MultiImageUpload value={images} onChange={setImages} onUpload={uploadImage} maxImages={10} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alt">Descripción de las imágenes</Label>
              <Input
                id="alt"
                value={imageDetails.alt}
                onChange={handleAltChange}
                placeholder="Ej: Partido contra Rival FC"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Tamaño en la galería</Label>
              <Select value={imageDetails.size} onValueChange={handleSizeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeño</SelectItem>
                  <SelectItem value="medium">Mediano</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
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
                  Subiendo...
                </>
              ) : (
                "Subir Imágenes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
