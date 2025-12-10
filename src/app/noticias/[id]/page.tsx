import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getNewsById, getNews } from "@/lib"
import NewsDetailClient from "./news-detail-client"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const news = await getNewsById(id)

  if (!news) {
    return {
      title: "Noticia no encontrada | El Carbonal FC",
    }
  }

  return {
    title: `${news.title} | El Carbonal FC`,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      images: news.images?.[0] ? [news.images[0]] : [],
      type: "article",
    },
  }
}

// Generar rutas estáticas para las noticias existentes
export async function generateStaticParams() {
  const news = await getNews()
  return news.map((item) => ({
    id: item.id,
  }))
}

// Formatear fecha
const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-HN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params
  const news = await getNewsById(id)

  if (!news) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Botón volver */}
        <Link
          href="/#noticias"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a noticias
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          {/* Header */}
          <div className="p-6 md:p-8 border-b">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{news.title}</h1>
            <p className="text-sky-600 mt-2">{formatDate(news.date)}</p>
          </div>

          {/* Galería de imágenes (client component) */}
          {news.images && news.images.length > 0 && (
            <NewsDetailClient images={news.images} title={news.title} />
          )}

          {/* Contenido */}
          <div className="p-6 md:p-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-sky-800 prose-a:text-sky-600"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}
