"use server";
import { toast } from "react-toastify";
import { Gender } from "../generated/prisma/enums";
import prisma from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export async function getDoctors() {
  try {
    const doctors = await prisma.doctors.findMany({
      include: {
        _count: { select: { appointment: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointment,
    }));
  } catch (error) {
    console.log("Failed to get doctors", error);
    throw new Error("Failed to get doctors");
  }
}
interface DoctorDataInterface {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  isActive: boolean;
  gender: Gender;
}
export async function createNewDoctor(doctorData: DoctorDataInterface) {
  try {
    if (
      !doctorData.name ||
      !doctorData.email ||
      !doctorData.phone ||
      !doctorData.specialty
    ) {
      toast.error("Please fill all required fields");
      throw new Error("Missing required fields");
    }
    const doctor = await prisma.doctors.create({
      data: {
        ...doctorData,
        imageUrl: generateAvatar(doctorData.name, doctorData.gender),
      },
    });
    revalidatePath("/admin");
    return doctor;
  } catch (error: { code?: string } | any) {
    if (error?.code === "P2002") {
      toast.error("Doctor with this email already exists");
      throw new Error("Doctor with this email already exists", error);
    }
    toast.error("Failed to create new doctor");
    throw new Error("Failed to create new doctor", error);
  }
}

interface EditDoctorInput extends Partial<DoctorDataInterface> {
  id: string;
}

export async function EditDoctorData(editedData: EditDoctorInput) {
  try {
    if (
      !editedData.name ||
      !editedData.email ||
      !editedData.phone ||
      !editedData.specialty
    ) {
      toast.error("Please fill all required fields");
      throw new Error("Missing required fields");
    }
    const currentDoctor = await prisma.doctors.findUnique({
      where: {
        id: editedData.id,
      },
      select: {
        email: true,
      },
    });

    // Is Doctor Exists
    if (!currentDoctor) {
      toast.error("Doctor not found");
      throw new Error("Doctor not found");
    }

    // Check that email is unique
    if (currentDoctor.email !== editedData.email) {
      const existingDoctor = await prisma.doctors.findUnique({
        where: {
          email: editedData.email,
        },
      });

      if (existingDoctor) {
        toast.error("Doctor with this email already exists");
        throw new Error("Doctor with this email already exists");
      }
    }

    // Update Data
    const doctor = await prisma.doctors.update({
      where: {
        id: editedData.id,
      },
      data: {
        name: editedData.name,
        email: editedData.email,
        specialty: editedData.specialty,
        isActive: editedData.isActive,
        phone: editedData.phone,
        gender: editedData.gender,
      },
    });
    return doctor;
  } catch (error) {
    toast.error("Failed to update Doctor data");
    throw new Error("Failed to update Doctor data");
  }
}
