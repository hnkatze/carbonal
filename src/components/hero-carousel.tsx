"use client"

import { useState, useEffect } from "react"
import { CldImage } from 'next-cloudinary';
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
interface Slide {
  id: string
  image: string
  title: string
  description: string
}
const defaultSlides = [
  {
    id: "1",
    image: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/heroSect/xcljahwoctm1ctyqnn6q",
    title: "Bienvenidos a El Carbonal FC",
    description: "El orgullo de nuestra comunidad",
  },
  {
    id:"2",
    image: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/heroSect/odorgk0dstla74ndkstl",
    title: "Únete a Nuestra Academia",
    description: "Formando los campeones del mañana",
  },
]

export default function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides)
  const [current, setCurrent] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const slidesCollection = collection(db, "slides")
        const slidesSnapshot = await getDocs(slidesCollection)

        if (!slidesSnapshot.empty) {
          const slidesData = slidesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Slide[]

          setSlides(slidesData)
        }
      } catch (error) {
        console.error("Error al cargar slides:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSlides()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const next = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <CldImage
            src={slides[current].image || "/placeholder.svg"}
            alt={slides[current].title}
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
            crop={{
              type: 'auto',
              source: true
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-2"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl"
            >
              {slides[current].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
