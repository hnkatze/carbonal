"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onUpload: (file: File) => Promise<string>
}

export default function ImageUpload({ value, onChange, onUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const url = await onUpload(file)
      onChange(url)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div
      onClick={handleClick}
      className={`relative border-2 border-dashed rounded-md p-4 transition-all ${
        value ? "border-transparent" : "border-gray-300 hover:border-gray-400"
      } flex flex-col items-center justify-center cursor-pointer`}
      style={{ height: "200px" }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      {value ? (
        <div className="relative w-full h-full">
          <Image src={value || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover rounded-md" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemove}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6">
          {isUploading ? (
            <Loader2 className="h-10 w-10 text-sky-500 animate-spin mb-2" />
          ) : (
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
          )}
          <p className="text-sm text-gray-500">{isUploading ? "Subiendo..." : "Haz clic para subir una imagen"}</p>
        </div>
      )}
    </div>
  )
}
