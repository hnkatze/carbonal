"use client"

import { useQuery } from "@tanstack/react-query"
import { getGalleryImages } from "@/lib"
import type { GalleryImage } from "../../types"

export const galleryKeys = {
  all: ["gallery"] as const,
}

export function useGallery(initialData?: GalleryImage[]) {
  return useQuery({
    queryKey: galleryKeys.all,
    queryFn: getGalleryImages,
    initialData,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}
