import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

// Configuración de contacto - actualizar con datos reales
const CONTACT = {
  phone: "+50494761498",
  phoneDisplay: "+504 9476-1498",
  email: "elcarbonalfc@outlook.com",
  address: {
    venue: "Estadio Bonito Oriental",
    area: "El Carbonal",
    city: "Bonito Oriental, Colón",
    country: "Honduras",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61550975422498",
    instagram: "https://www.instagram.com/elcarbonalfc",
  },
}

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
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
              Comprometidos con el deporte y la comunidad. Formando jugadores y personas desde 2017.
            </p>
            <div className="flex gap-4">
              <Link
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-100 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-100 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#nosotros" className="text-sky-100 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#noticias" className="text-sky-100 hover:text-white transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="#partidos" className="text-sky-100 hover:text-white transition-colors">
                  Partidos
                </Link>
              </li>
              <li>
                <Link href="#equipo" className="text-sky-100 hover:text-white transition-colors">
                  Equipo
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="text-sky-100 hover:text-white transition-colors">
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2 text-sky-100">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{CONTACT.address.venue}</p>
                  <p>{CONTACT.address.area}</p>
                  <p>{CONTACT.address.city}</p>
                </div>
              </div>
              <Link
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sky-100 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{CONTACT.email}</span>
              </Link>
              <Link
                href={`https://wa.me/${CONTACT.phone.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sky-100 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{CONTACT.phoneDisplay}</span>
              </Link>
            </address>

            {/* WhatsApp CTA */}
            <Link
              href={`https://wa.me/${CONTACT.phone.replace(/\+/g, "")}?text=Hola,%20me%20gustaría%20obtener%20información%20sobre%20El%20Carbonal%20FC`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </Link>
          </div>
        </div>

        <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sky-200">
          <p>&copy; {new Date().getFullYear()} El Carbonal FC. Todos los derechos reservados.</p>
          <p className="text-xs mt-2 text-sky-300">
            Desarrollado por{" "}
            <Link
              href="https://www.linkedin.com/in/hnkatze"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Camilo Henriquez
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
