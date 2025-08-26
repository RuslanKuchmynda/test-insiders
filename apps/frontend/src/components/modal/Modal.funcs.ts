import { apiPost } from "@/services/api";
import { apiRoutes } from "@/constants/routes";
import type { Trip } from "@/pages/trips/Trip.funcs.ts";

export interface CreateTripForm {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface ShareForm {
  email: string;
  tripId?: string;
}

export async function createTrip(data: CreateTripForm) {
  return await apiPost<CreateTripForm, Trip>(apiRoutes.trips, data);
}

export async function shareTrip(data: ShareForm) {
  return await apiPost<ShareForm, Response>(apiRoutes.shareTrip, data);
}
