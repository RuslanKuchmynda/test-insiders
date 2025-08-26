import { apiDelete, apiGet, apiPatch, apiPostRaw } from "@/services/api";
import { apiRoutes } from "@/constants/routes";

export interface Trip {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
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

export interface Place {
  id: string;
  tripId: string;
  locationName: string;
  notes?: string;
  dayNumber: number;
}

export interface TripDetailsResponse {
  trip: Trip;
  places: Place[];
}

export async function getTripById(tripId: string) {
  return await apiGet<TripDetailsResponse>(`${apiRoutes.trips}/${tripId}`);
}

export async function deleteTripById(tripId: string) {
  return await apiDelete<{ message: string }>(`${apiRoutes.trips}/${tripId}`);
}

export interface CreatePlace {
  tripId: string;
  locationName: string;
  notes?: string;
  dayNumber: number;
}

export async function createPlace(data: CreatePlace) {
  return await apiPostRaw<CreatePlace, Place>(`/places`, data);
}

export interface UpdatePlace {
  locationName?: string;
  notes?: string;
  dayNumber?: number;
}

export async function updatePlace(placeId: string, data: UpdatePlace) {
  return await apiPatch<UpdatePlace, Place>(`/places/${placeId}`, data);
}

export interface UpdateTrip {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export async function updateTrip(tripId: string, data: UpdateTrip) {
  return await apiPatch<UpdateTrip, Trip>(`${apiRoutes.trips}/${tripId}`, data);
}

export async function deletePlace(placeId: string) {
  return await apiDelete<{ message: string }>(`/places/${placeId}`);
}
