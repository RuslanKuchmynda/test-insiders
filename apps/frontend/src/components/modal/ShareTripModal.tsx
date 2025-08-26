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
import { Input } from "@/components/ui/input.tsx";
import { type ShareForm, shareTrip } from "@/components/modal/Modal.funcs.ts";
import { useState } from "react";

interface ShareTripModalProps {
  tripId: string;
}

export default function ShareTripModal({ tripId }: ShareTripModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShareForm>();

  const onSubmit = async (data: ShareForm) => {
    try {
      const payload = { ...data, tripId };
      await shareTrip(payload);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to share trip:", error);
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Trip</DialogTitle>
            <DialogDescription>
              Fill in the details below to share a trip.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Email"
                id="email"
                placeholder="john@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="mt-4 w-full">
              Share
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
