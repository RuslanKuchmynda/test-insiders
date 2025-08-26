import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import Places, {
  type EditablePlace as EditablePlaceFromComponent,
  type PlaceFormValues,
} from "@/components/places/Places.tsx";
import {
  createPlace,
  deletePlace,
  deleteTripById,
  getTripById,
  updatePlace,
  type Trip,
  type TripDetailsResponse,
} from "@/pages/trips/Trip.funcs.ts";
import { routes } from "@/constants/routes.ts";
import EditTripModal from "@/components/modal/EditTripModal.tsx";
import { useAuthStore } from "@/store/auth-store.ts";
import { localStorageConstants } from "@/constants/local-storage.ts";

type EditablePlace = EditablePlaceFromComponent;

export default function TripPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [places, setPlaces] = useState<EditablePlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useAuthStore((s) => s.accessToken);
  const token =
    accessToken ??
    (typeof window !== "undefined"
      ? localStorage.getItem(localStorageConstants.accessToken)
      : null);
  const currentUserId = useMemo(() => {
    try {
      if (!token) return null;
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return (JSON.parse(jsonPayload) as { id?: string }).id ?? null;
    } catch {
      return null;
    }
  }, [token]);
  const isOwner = useMemo(
    () => !!trip && currentUserId === trip.ownerId,
    [trip, currentUserId]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data: TripDetailsResponse = await getTripById(id);
        setTrip(data.trip);
        setPlaces(
          (data.places ?? []).map((p) => ({
            id: p.id,
            locationName: p.locationName,
            notes: p.notes,
            dayNumber: p.dayNumber,
            isEditing: false,
          }))
        );
      } catch (e) {
        setError("Failed to load trip");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const onAddPlace = async (data: PlaceFormValues) => {
    if (!trip) return;

    const { locationName, notes, dayNumber } = data;

    if (!locationName || !Number.isInteger(dayNumber) || dayNumber < 1) return;

    const created = await createPlace({
      tripId: trip.id,
      locationName: locationName.trim(),
      notes: notes?.trim() || undefined,
      dayNumber,
    });
    setPlaces((prev) => [
      ...prev,
      {
        id: created.id,
        locationName: created.locationName,
        notes: created.notes,
        dayNumber: created.dayNumber,
      },
    ]);
  };

  const onDeletePlace = async (placeId: string) => {
    await deletePlace(placeId);
    setPlaces((prev) => prev.filter((p) => p.id !== placeId));
  };

  const handleDeleteTrip = async () => {
    if (!trip) return;
    await deleteTripById(trip.id);
    navigate(routes.trips);
  };

  if (loading) {
    return <div className="mx-auto w-full max-w-4xl p-4">Loading...</div>;
  }
  if (error || !trip) {
    return (
      <div className="mx-auto w-full max-w-4xl p-4">{error ?? "Not found"}</div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-4 md:p-6 space-y-8">
      <div className="relative overflow-hidden rounded-xl border">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {trip.title}
            </h1>
            {trip.description && (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {trip.description}
              </p>
            )}
            {trip.startDate && trip.endDate && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                  {trip.startDate}
                </span>
                <span className="text-xs text-muted-foreground">to</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium">
                  {trip.endDate}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/trips")}>
              Back
            </Button>
            {isOwner && (
              <EditTripModal
                trip={trip}
                onUpdated={(updated) => setTrip(updated)}
              />
            )}
            {isOwner && (
              <Button variant="destructive" onClick={handleDeleteTrip}>
                Delete Trip
              </Button>
            )}
          </div>
        </div>
      </div>

      <Places
        places={places}
        onAdd={onAddPlace}
        onDelete={onDeletePlace}
        onUpdate={async (placeId, data) => {
          const updated = await updatePlace(placeId, {
            locationName: data.locationName?.trim() || undefined,
            notes: data.notes?.trim() || undefined,
            dayNumber: data.dayNumber,
          });
          setPlaces((prev) =>
            prev.map((p) =>
              p.id === placeId
                ? {
                    id: updated.id,
                    locationName: updated.locationName,
                    notes: updated.notes,
                    dayNumber: updated.dayNumber,
                  }
                : p
            )
          );
        }}
      />
    </div>
  );
}
