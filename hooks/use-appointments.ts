"use client";
import {
  bookAppointment,
  getAppointments,
  getBookedTime,
  getUserAppointments,
} from "@/lib/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useGetAppointments() {
  const response = useQuery({
    queryKey: ["getAppointments"],
    queryFn: getAppointments,
  });
  return response;
}
export function useBookedTime(doctorId: string, date: string) {
  const response = useQuery({
    queryKey: ["getBookedTime"],
    queryFn: () => {
      getBookedTime(doctorId, date);
    },
    enabled: !!doctorId && !!date,
  });
  return response;
}

export function useBookAppointments() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      toast.success("Appointment Booked Successfully");
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
    },
    onError: () => toast.error("Failed to book an appointment"),
  });
}

export function useUserAppointments() {
  const result = useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });

  return result;
}
