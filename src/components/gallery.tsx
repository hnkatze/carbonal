"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useGallery } from "@/hooks"
import type { GalleryImage } from "../../types"

interface GalleryProps {
  initialData: GalleryImage[]
}

export default function Gallery({ initialData }: GalleryProps) {
  const { data: galleryImages = [] } = useGallery(initialData)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % galleryImages.length)
  }

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)
  }

  if (galleryImages.length === 0) {
    return (
      <section id="galeria" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-sky-800">Galería</h2>
          <p className="text-center text-gray-500">No hay imágenes disponibles en la galería.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="galeria" className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-sky-800"
        >
          Galería
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`cursor-pointer overflow-hidden rounded-lg ${
                image.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : image.size === "medium"
                    ? "md:col-span-1 md:row-span-1"
                    : "md:col-span-1 md:row-span-1"
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className="relative w-full h-full aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/20 hover:bg-black/40 z-10"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/20 hover:bg-black/40 z-10"
                onClick={goToPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/20 hover:bg-black/40 z-10"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[selectedImage].src || "/placeholder.svg"}
                  alt={galleryImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                  {galleryImages[selectedImage].alt}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
