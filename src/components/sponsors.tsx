"use client";

import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";

// Datos de ejemplo
const sponsors = [
  {
    id: 1,
    name: "Galo",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/zttskniatnopako1zujn",
  },
  {
    id: 2,
    name: "Richard",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/jpplg0jbyt6sdxpzlqhk",
  },
  {
    id: 3,
    name: "Sabillon",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/oj8i3qgtaw2dgbufvjgp",
  },
  {
    id: 4,
    name: "Inversiones",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/fylkcotjj2nc7wmlf4xu",
  },
  {
    id: 5,
    name: "multicable",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/jxzfa0cinehvwzg1zvhv",
  },
  {
    id: 6,
    name: "Guardado",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/kumaysqqwfjdaf49uiqw",
  },
  {
    id: 7,
    name: "SanJose",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/kumaysqqwfjdaf49uiqw",
  },
  {
    id: 8,
    name: "Mazapan",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/j5fycvjfk4gerlkl6woc",
  },
  {
    id: 9,
    name: "Black River",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/lefrpmhbgkk12td8wg8f",
  },
  {
    id: 10,
    name: "Shamar",
    logo: "https://res.cloudinary.com/djluqrprg/image/upload/f_auto,q_auto/v1/el%20carbonal/patrocinadores/nzqblqnoh84vx1avdell",
  },
];

export default function Sponsors() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-sky-800"
        >
          Nuestros Patrocinadores
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CldImage
                src={sponsor.logo || "/placeholder.svg"}
                alt={sponsor.name}
                width={1920}
                height={1080}
                className="object-cover w-full h-full"
                crop={{
                  type: "auto",
                  source: true,
                }}
              />
              <div className="relative h-16 w-full bg-white rounded-full overflow-hidden">
                {/* <Image src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} fill className="object-contain rounded-full" /> */}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
