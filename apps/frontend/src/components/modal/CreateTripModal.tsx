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
import {
  createTrip,
  type CreateTripForm,
} from "@/components/modal/Modal.funcs.ts";
import type { Trip } from "@/pages/trips/Trip.funcs.ts";
import { useState } from "react";

export default function CreateTripModal({
  onCreated,
}: {
  onCreated?: (trip: Trip) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTripForm>();

  const onSubmit = async (data: CreateTripForm) => {
    try {
      const created = await createTrip(data);
      onCreated?.(created);
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create trip:", error);
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button>Create Trip</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Trip</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new trip.
            </DialogDescription>
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
              Create Trip
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
