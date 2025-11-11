"use client";
import { getAppointments } from "@/lib/actions/appointments";
import { useQuery } from "@tanstack/react-query";

export function useGetAppointments() {
  const response = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
  return response;
}
