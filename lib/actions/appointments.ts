"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { toast } from "react-toastify";
import { AppointmentStatus } from "@prisma/client";

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.log("Failed to get Appointments", error);
    throw new Error("Failed to get Appointments");
  }
}

export async function getUserAppointments() {
  try {
    const { userId } = await auth();
    if (!userId) {
      toast.error("You aren't authenticated");
      throw new Error("You aren't authenticated");
    }
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      toast.error("Create an account first!");
      throw new Error("Create an account first!");
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });
    return appointments.map(transformAppointment);
  } catch (error) {
    toast.error("Error fetching user appointments:");
    throw new Error("Failed to fetch user appointments");
  }
}

export async function getUserAppointmentsStats() {
  try {
    const { userId } = await auth();
    if (!userId) {
      toast.error("You aren't authenticated");
      throw new Error("You aren't authenticated");
    }
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      toast.error("Create an account first!");
      throw new Error("Create an account first!");
    }
    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({ where: { userId: user?.id } }),
      prisma.appointment.count({
        where: { userId: user?.id, status: "COMPLETED" },
      }),
    ]);
    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${
      appointment.user.lastName || ""
    }`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
}

export async function getBookedTime(doctorId: string, date: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: new Date(date),
        status: {
          in: ["COMPLETED", "CONFIRMED"],
        },
      },
      select: { time: true },
    });
    return appointments.map((appointment) => appointment.time);
  } catch (error) {
    throw new Error("Failed to fetch Booked time");
  }
}
interface AppointmentsType {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}
export async function bookAppointment(input: AppointmentsType) {
  try {
    const { userId } = await auth();
    if (!userId) {
      toast.error("You must login first! ");
      throw new Error("You must login first! ");
    }
    if (!input.date || !input.doctorId || !input.time) {
      toast.error("Doctor, date, and time are required");
      throw new Error("Doctor, date, and time are required");
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) {
      toast.error("User not found!");
      throw new Error("User not found!");
    }

    const appointments = await prisma.appointment.create({
      data: {
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General Consultation",
        doctorId: input.doctorId,
        userId: user.id,
        status: "CONFIRMED",
      },

      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return transformAppointment(appointments);
  } catch (error) {
    toast.error("Failed to book an appointment");
    throw new Error("Failed to book an appointment");
  }
}

export async function updateAppointmentStatus(input: {
  id: string;
  status: AppointmentStatus;
}) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
}
