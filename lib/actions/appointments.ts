"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { toast } from "react-toastify";
import { promises } from "dns";
import { time } from "console";

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

    return appointments;
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
    return appointments.map(transformAppointment)
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
