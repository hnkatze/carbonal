export function GallerySkeleton() {
  return (
    <section id="galeria" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="h-9 bg-gray-200 rounded w-32 mx-auto mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  )
}
