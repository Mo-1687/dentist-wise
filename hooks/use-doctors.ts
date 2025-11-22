"use client";

import {
  createNewDoctor,
  EditDoctorData,
  getAvailableDoctors,
  getDoctors,
} from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useGetDoctors() {
  const response = useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });
  return response;
}

export function useCreateDoctors() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationKey: ["createDoctors"],
    mutationFn: createNewDoctor,
    onSuccess: () => {
      toast.success("New doctor added successfully");
      // Refetch Data
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error: any) => {
      if (error?.code === "P2002")
        toast.error("Doctor with this email already exists");
      toast.error("Failed to add new doctor");
    },
  });
  return response;
}

export function useUpdateDoctors() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationKey: ["updateDoctors"],
    mutationFn: EditDoctorData,
    onSuccess: () => {
      toast.success("Doctor data updated successfully");
      // Refetch Data
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error: any) => {
      if (error?.code === "P2002")
        toast.error("Doctor with this email already exists");
      toast.error("Failed update doctor");
    },
  });
  return response;
}

export function useAvailableDoctors() {
  const result = useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });
  return result;
}
