import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateDoctors } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";

import { Loader } from "lucide-react";
import {  useState } from "react";
import { toast } from "react-toastify";
interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddDoctorDialog = ({ isOpen, onClose }: AddDoctorDialogProps) => {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    gender: "MALE" as Gender,
    isActive: true,
  });
  const { mutate, isPending } = useCreateDoctors();

  function handleSave() {
    mutate(
      { ...newDoctor },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  }

  function handleClose() {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      gender: "MALE" as Gender,
      isActive: true,
    });
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewDoctor({
      ...newDoctor,
      phone: e.target.value,
    });
  }

  function handlePhoneBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    const regex = /^\+?[1-9]\d{1,14}$/;
    const isValid = regex.test(value);

    if (!isValid && value.length > 0) {
      toast.error("Invalid phone number");
    } else {
      setNewDoctor({
        ...newDoctor,
        phone: value,
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Add a new doctor to your practice.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Name *</Label>
              <Input
                id="new-name"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                placeholder="Dr. John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-speciality">Speciality *</Label>
              <Input
                id="new-specialty"
                value={newDoctor.specialty}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, specialty: e.target.value })
                }
                placeholder="General Dentistry"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-email">Email *</Label>
            <Input
              id="new-email"
              type="email"
              value={newDoctor.email}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, email: e.target.value })
              }
              placeholder="doctor@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              type="text"
              value={newDoctor.phone}
              onChange={(e) => handlePhoneChange(e)}
              onBlur={(e) => handlePhoneBlur(e)}
              placeholder="Enter  phone number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-gender">Gender</Label>
              <Select
                value={newDoctor.gender || ""}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, gender: value as Gender })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={
              !newDoctor.name ||
              !newDoctor.email ||
              !newDoctor.specialty ||
              isPending
            }
          >
            {isPending ? (
              <span>
                <Loader />
              </span>
            ) : (
              "Add Doctor"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorDialog;
