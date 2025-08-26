import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { updateTrip, type Trip } from "@/pages/trips/Trip.funcs.ts";
import { useState } from "react";

export interface EditTripForm {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export default function EditTripModal({
  trip,
  onUpdated,
  disabled,
}: {
  trip: Trip;
  onUpdated?: (trip: Trip) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTripForm>({
    defaultValues: {
      title: trip.title,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
    },
  });

  const onSubmit = async (data: EditTripForm) => {
    try {
      const updated = await updateTrip(trip.id, data);
      onUpdated?.(updated);
      reset({
        title: updated.title,
        description: updated.description,
        startDate: updated.startDate,
        endDate: updated.endDate,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Trip</DialogTitle>
          <DialogDescription>Update trip details</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <Input
              label="Title"
              id="title"
              placeholder="Trip title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-sm" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Trip description"
              {...register("description")}
            />
          </div>

          <div className="space-y-1">
            <Input
              label="Start Date"
              type="date"
              id="startDate"
              {...register("startDate")}
            />
          </div>

          <div className="space-y-1">
            <Input
              label="End Date"
              type="date"
              id="endDate"
              {...register("endDate")}
            />
          </div>

          <Button type="submit" className="mt-4 w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
