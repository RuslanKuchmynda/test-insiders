import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {db} from "@/db/db";
import {CreatePlaceDto} from "@/modules/places/dto/create-place.dto";
import {tripSchema} from "@/db/schemas/trip.schema";
import {placeSchema} from "@/db/schemas/place.schema";
import { v4 as uuidv4 } from "uuid";
import {UpdatePlaceDto} from "@/modules/places/dto/update-place.dto";
import {eq} from "drizzle-orm";
@Injectable()
export class PlacesService {

  async createPlace(userId: string, dto: CreatePlaceDto) {

    console.log(dto)
    const trips = await db
      .select()
      .from(tripSchema)
      .where(eq(tripSchema.id, dto.tripId));

    const trip = trips[0];

    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.ownerId !== userId) throw new ForbiddenException('No permission to add place');

    const [place] = await db.insert(placeSchema).values({
      id: uuidv4(),
      tripId: dto.tripId,
      locationName: dto.locationName,
      notes: dto.notes,
      dayNumber: dto.dayNumber,
    }).returning();

    return place;
  }

  async updatePlace(userId: string, placeId: string, dto: UpdatePlaceDto) {
    const places = await db
      .select()
      .from(placeSchema)
      .where(eq(placeSchema.id, placeId));

    const place = places[0];

    if (!place) throw new NotFoundException('Place not found');


    const trips = await db.select().from(tripSchema).where(eq(tripSchema.id, place.tripId));

    const trip = trips[0];

    if (!trip) throw new ForbiddenException('No permission to edit this place');
    if (trip.ownerId !== userId) throw new ForbiddenException('No permission to edit this place');

    const [updated] = await db.update(placeSchema)
      .set({
        locationName: dto.locationName ?? place.locationName,
        notes: dto.notes ?? place.notes,
        dayNumber: dto.dayNumber ?? place.dayNumber,
      })
      .where(eq(placeSchema.id, placeId))
      .returning();

    return updated;
  }

  async deletePlace(userId: string, placeId: string) {
    const places = await db.select().from(placeSchema).where(eq(placeSchema.id, placeId));

    const place = places[0];

    if (!place) throw new NotFoundException('Place not found');

    const trips = await db.select().from(tripSchema).where(eq(tripSchema.id, place.tripId));

    const trip = trips[0];

    if (!trip) throw new ForbiddenException('No permission to delete this place');
    if (trip.ownerId !== userId) throw new ForbiddenException('No permission to delete this place');

    await db.delete(placeSchema).where(eq(placeSchema.id, placeId));

    return { message: 'Place deleted successfully' };
  }

}
