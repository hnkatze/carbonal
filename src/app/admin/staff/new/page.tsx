"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ImageUpload from "@/components/image-upload"
import { Loader2 } from "lucide-react"
import { addStaffMember, uploadImage } from "@/lib"

export default function NewStaffPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.role) {
      alert("Por favor, completa todos los campos obligatorios")
      return
    }

    try {
      setIsSubmitting(true)
      await addStaffMember(formData)
      router.push("/admin/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error al crear el miembro del cuerpo técnico:", error)
      alert("Ocurrió un error al crear el miembro del cuerpo técnico")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Miembro del Cuerpo Técnico</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input id="role" name="role" value={formData.role} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>Foto</Label>
              <ImageUpload value={formData.image} onChange={handleImageChange} onUpload={uploadImage} />
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
                "Guardar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
