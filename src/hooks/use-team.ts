"use client"

import { useQuery } from "@tanstack/react-query"
import { getPlayers, getStaff } from "@/lib"
import type { Player, StaffMember } from "../../types"

export const teamKeys = {
  players: ["players"] as const,
  staff: ["staff"] as const,
}

export function usePlayers(initialData?: Player[]) {
  return useQuery({
    queryKey: teamKeys.players,
    queryFn: getPlayers,
    initialData,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export function useStaff(initialData?: StaffMember[]) {
  return useQuery({
    queryKey: teamKeys.staff,
    queryFn: getStaff,
    initialData,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}
