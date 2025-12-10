"use client"

import { useQuery } from "@tanstack/react-query"
import { getNews } from "@/lib"
import type { News } from "../../types"

export const newsKeys = {
  all: ["news"] as const,
  lists: () => [...newsKeys.all, "list"] as const,
  detail: (id: string) => [...newsKeys.all, "detail", id] as const,
}

export function useNews(initialData?: News[]) {
  return useQuery({
    queryKey: newsKeys.lists(),
    queryFn: getNews,
    initialData,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
