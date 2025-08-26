import { apiGet } from "@/services/api";
import { apiRoutes } from "@/constants/routes";

export interface Trip {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TripCollaborator {
  id: string;
  tripId: string;
  userId: string;
  role: "collaborator" | "owner";
}

export interface TripWithCollaborator {
  trip: Trip;
  tripCollaborator?: TripCollaborator;
}

export async function getTrips() {
  return await apiGet<TripWithCollaborator[]>(apiRoutes.trips);
}
