import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
        {children}
      </div>
    </div>
  )
}
