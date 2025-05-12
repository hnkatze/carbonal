"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-16 px-4 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-sky-800"
        >
          Nosotros
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image src="https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el-carbonal-fc/uigxvftclgjjcdskgmzj" alt="El Carbonal FC" fill className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-sky-700">Nuestra Historia</h3>
            <p className="text-gray-700">
              El Carbonal FC nació en el corazón de nuestra comunidad con el objetivo de fomentar el deporte y los
              valores que lo acompañan. Desde nuestros humildes inicios, hemos crecido hasta convertirnos en un
              referente deportivo de la región.
            </p>
            <p className="text-gray-700">
              A lo largo de nuestra trayectoria, hemos formado a numerosos jugadores que han llegado a competir en las
              más altas categorías, siempre manteniendo nuestra filosofía de juego y nuestro compromiso con la
              comunidad.
            </p>

            <div className="pt-4">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">Nuestros Valores</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600 mb-2">Compromiso</h4>
                  <p className="text-gray-600 text-sm">Dedicación total al club y a la comunidad que representamos.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600 mb-2">Trabajo en Equipo</h4>
                  <p className="text-gray-600 text-sm">Colaboración y apoyo mutuo para alcanzar objetivos comunes.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600 mb-2">Respeto</h4>
                  <p className="text-gray-600 text-sm">
                    Consideración hacia compañeros, rivales, árbitros y aficionados.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sky-600 mb-2">Superación</h4>
                  <p className="text-gray-600 text-sm">Esfuerzo constante por mejorar y superar los obstáculos.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
