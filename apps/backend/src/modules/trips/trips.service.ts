import { db } from "@/db/db";
import { Injectable } from "@nestjs/common";
import {eq, or} from "drizzle-orm";
import {tripSchema} from "@/db/schemas/trip.schema";
import {tripCollaboratorsSchema} from "@/db/schemas/trip-collaborator.schema";

@Injectable()
export class TripsService {
  async getAllTrips(currentUserId: string) {
    const trips = await db
      .select()
      .from(tripSchema)
      .leftJoin(
        tripCollaboratorsSchema,
        eq(tripSchema.id, tripCollaboratorsSchema.tripId)
      )
      .where(
        or(
          eq(tripSchema.ownerId, currentUserId),
          eq(tripCollaboratorsSchema.userId, currentUserId)
        )
      );

    return trips;
  }
}
