"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Noticias", href: "#noticias" },
  { name: "Partidos", href: "#partidos" },
  { name: "Equipo", href: "#equipo" },
  { name: "Galería", href: "#galeria" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
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
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-sky-600">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b"
        >
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-sky-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
