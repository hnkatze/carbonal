"use client"

import { useQuery } from "@tanstack/react-query"
import { getMatchesByStatus } from "@/lib"
import type { Match, MatchStatus } from "../../types"

export const matchKeys = {
  all: ["matches"] as const,
  lists: () => [...matchKeys.all, "list"] as const,
  byStatus: (status: MatchStatus) => [...matchKeys.all, "status", status] as const,
}

export function useMatchesByStatus(status: MatchStatus, initialData?: Match[]) {
  return useQuery({
    queryKey: matchKeys.byStatus(status),
    queryFn: () => getMatchesByStatus(status),
    initialData,
    staleTime: status === "live" ? 30 * 1000 : 5 * 60 * 1000, // 30s para live, 5min otros
    refetchInterval: status === "live" ? 30 * 1000 : false, // Auto-refresh para partidos en vivo
  })
}
