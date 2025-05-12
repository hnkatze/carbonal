import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo1.png"
                  alt="El Carbonal FC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">El Carbonal FC</span>
            </div>
            <p className="text-sky-100 mb-4">
              Comprometidos con el deporte y la comunidad. Formando jugadores y personas desde 2010.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sky-100 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-sky-100 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-sky-100 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-sky-100 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#nosotros" className="text-sky-100 hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#noticias" className="text-sky-100 hover:text-white">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="#partidos" className="text-sky-100 hover:text-white">
                  Partidos
                </Link>
              </li>
              <li>
                <Link href="#equipo" className="text-sky-100 hover:text-white">
                  Equipo
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="text-sky-100 hover:text-white">
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-sky-100">
              <p>Estadio El Carbonal</p>
              <p>Calle Principal #123</p>
              <p>Ciudad, País</p>
              <p className="mt-2">info@elcarbonalfc.com</p>
              <p>+123 456 7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sky-200">
          <p>&copy; {new Date().getFullYear()} El Carbonal FC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
