"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Inicio", href: "/", sectionId: null },
  { name: "Nosotros", href: "#nosotros", sectionId: "nosotros" },
  { name: "Noticias", href: "#noticias", sectionId: "noticias" },
  { name: "Partidos", href: "#partidos", sectionId: "partidos" },
  { name: "Equipo", href: "#equipo", sectionId: "equipo" },
  { name: "Galería", href: "#galeria", sectionId: "galeria" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter((item) => item.sectionId)
        .map((item) => item.sectionId as string)

      // Si estamos al inicio, no hay sección activa
      if (window.scrollY < 100) {
        setActiveSection(null)
        return
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Si la sección está visible en el viewport (con offset del navbar)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            return
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Ejecutar al montar

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll al hacer click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string | null) => {
    if (sectionId) {
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        const navbarHeight = 64 // h-16 = 64px
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth",
        })
      }
    }
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src="/logo1.png"
              alt="El Carbonal FC Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-sky-600">El Carbonal FC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => {
            const isActive = item.sectionId === activeSection || (item.sectionId === null && activeSection === null)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-sky-600 ${
                  isActive ? "text-sky-600" : "text-gray-700"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b bg-white overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = item.sectionId === activeSection || (item.sectionId === null && activeSection === null)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.sectionId)}
                      className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-sky-50 text-sky-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-sky-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
