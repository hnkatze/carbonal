"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Loader2, Plus } from "lucide-react"

interface MultiImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  onUpload: (file: File) => Promise<string>
  maxImages?: number
}

export default function MultiImageUpload({ value = [], onChange, onUpload, maxImages = 10 }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (value.length >= maxImages) return
    fileInputRef.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const url = await onUpload(file)
      onChange([...value, url])
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
            <Image src={url || "/placeholder.svg"} alt={`Uploaded image ${index + 1}`} fill className="object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full h-6 w-6"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {value.length < maxImages && (
          <div
            onClick={handleClick}
            className="border-2 border-dashed rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-sky-500 animate-spin" />
            ) : (
              <>
                <Plus className="h-8 w-8 text-gray-400" />
                <p className="text-xs text-gray-500 mt-2">Añadir imagen</p>
              </>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading || value.length >= maxImages}
      />

      {value.length >= maxImages && (
        <p className="text-xs text-amber-600">Has alcanzado el límite máximo de {maxImages} imágenes.</p>
      )}
    </div>
  )
}
