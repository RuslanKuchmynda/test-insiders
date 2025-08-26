import TripCard from "@/components/trips/TripCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import Search from "@/components/search/Search.tsx";
import {useEffect, useState} from "react";
import {getTrips, type TripWithCollaborator} from "@/pages/trips/TripPage.funcs.ts";

export default function TripsPage() {
  const [trips, setTrips] = useState<TripWithCollaborator[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (e) {
        console.error("Failed to fetch trips", e);
      }
    };

    fetchTrips();
  }, []);
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Trips</h1>
        <Search/>
        <Button onClick={() => console.log("create trip")}>
          Create Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TripCard
            key={trip.trip.id}
            id={trip.trip.id}
            title={trip.trip.title}
            description={trip.trip.description}
            startDate={trip.trip.startDate}
            endDate={trip.trip.endDate}
            imageUrl={"https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          />
        ))}
      </div>
    </div>
  );
}
