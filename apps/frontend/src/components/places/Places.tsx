import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export type EditablePlace = {
  id: string;
  locationName: string;
  notes?: string;
  dayNumber: number;
  isEditing?: boolean;
};

export type PlaceFormValues = {
  locationName: string;
  notes?: string;
  dayNumber: number;
};

export default function Places({
  places,
  onAdd,
  onDelete,
  onUpdate,
}: {
  places: EditablePlace[];
  onAdd: (data: PlaceFormValues) => Promise<void>;
  onDelete: (placeId: string) => Promise<void>;
  onUpdate: (placeId: string, data: PlaceFormValues) => Promise<void>;
}) {
  const sortedPlaces = useMemo(() => {
    return [...places].sort((a, b) => a.dayNumber - b.dayNumber);
  }, [places]);

  const { register, handleSubmit, reset } = useForm<PlaceFormValues>();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<PlaceFormValues>({
    locationName: "",
    notes: "",
    dayNumber: 1,
  });

  const submitHandler = async (data: PlaceFormValues) => {
    await onAdd(data);
    reset();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle>Add place</CardTitle>
          <CardDescription>Specify the day and a location</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-1 gap-3"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="space-y-1">
              <Label htmlFor="locationName">Location name</Label>
              <Input
                id="locationName"
                placeholder="e.g. Eiffel Tower"
                {...register("locationName", { required: true })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Optional" {...register("notes")} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dayNumber">Day</Label>
              <Input
                id="dayNumber"
                type="number"
                min={1}
                placeholder="1"
                {...register("dayNumber", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <Button type="submit" className="w-full">
              Add place
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Itinerary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Itinerary</CardTitle>
          <CardDescription>Ordered by dayNumber</CardDescription>
        </CardHeader>
        <CardContent>
          {sortedPlaces.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
              <div className="text-2xl mb-2">🗺️</div>
              No places yet. Add your first stop using the form.
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <ul className="space-y-3">
                {sortedPlaces.map((p) => (
                  <li key={p.id} className="relative pl-14">
                    <div className="absolute left-0 top-3 h-8 w-8 -translate-x-0.5 grid place-items-center rounded-full border bg-background text-xs font-semibold">
                      {p.dayNumber}
                    </div>
                    <div className="rounded-lg border p-3 hover:bg-muted/30 transition-colors">
                      {editingId === p.id ? (
                        <form
                          className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            await onUpdate(p.id, editValues);
                            setEditingId(null);
                          }}
                        >
                          <div className="md:col-span-3 space-y-1">
                            <Label htmlFor={`locationName-${p.id}`}>
                              Location
                            </Label>
                            <Input
                              id={`locationName-${p.id}`}
                              value={editValues.locationName}
                              onChange={(e) =>
                                setEditValues((v) => ({
                                  ...v,
                                  locationName: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="md:col-span-2 space-y-1">
                            <Label htmlFor={`notes-${p.id}`}>Notes</Label>
                            <Input
                              id={`notes-${p.id}`}
                              value={editValues.notes ?? ""}
                              onChange={(e) =>
                                setEditValues((v) => ({
                                  ...v,
                                  notes: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="md:col-span-1 space-y-1">
                            <Label htmlFor={`dayNumber-${p.id}`}>Day</Label>
                            <Input
                              id={`dayNumber-${p.id}`}
                              type="number"
                              min={1}
                              value={editValues.dayNumber}
                              onChange={(e) =>
                                setEditValues((v) => ({
                                  ...v,
                                  dayNumber: Number(e.target.value),
                                }))
                              }
                            />
                          </div>
                          <div className="md:col-span-6 flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" size="sm">
                              Save
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">
                              {p.locationName}
                            </div>
                            {p.notes && (
                              <div className="text-xs text-muted-foreground truncate">
                                {p.notes}
                              </div>
                            )}
                          </div>
                          <div className="shrink-0 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingId(p.id);
                                setEditValues({
                                  locationName: p.locationName,
                                  notes: p.notes,
                                  dayNumber: p.dayNumber,
                                });
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onDelete(p.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
