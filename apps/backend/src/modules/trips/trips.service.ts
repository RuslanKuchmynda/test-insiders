import { db } from '@/db/db';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, or } from 'drizzle-orm';
import { tripSchema } from '@/db/schemas/trip.schema';
import { tripCollaboratorsSchema } from '@/db/schemas/trip-collaborator.schema';
import { CreateTripDto } from '@/modules/trips/dto/create-trip.dto';
import { v4 as uuidv4 } from 'uuid';
import { placeSchema } from '@/db/schemas/place.schema';
import { UpdateTripDto } from '@/modules/trips/dto/update-trip.dto';

@Injectable()
export class TripsService {
  async getAllTrips(userId: string) {
    const trips = await db
      .select()
      .from(tripSchema)
      .leftJoin(
        tripCollaboratorsSchema,
        eq(tripSchema.id, tripCollaboratorsSchema.tripId),
      )
      .where(
        or(
          eq(tripSchema.ownerId, userId),
          eq(tripCollaboratorsSchema.userId, userId),
        ),
      );

    return trips;
  }

  async createTrip(userId: string, dto: CreateTripDto) {
    if (
      dto.startDate &&
      dto.endDate &&
      new Date(dto.startDate) > new Date(dto.endDate)
    ) {
      throw new BadRequestException('Start date cannot be after end date');
    }

    const [trip] = await db
      .insert(tripSchema)
      .values({
        id: uuidv4(),
        ownerId: userId,
        title: dto.title,
        description: dto.description,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      })
      .returning();

    return trip;
  }

  async deleteTrip(userId: string, tripId: string) {
    const trips = await db
      .select()
      .from(tripSchema)
      .where(eq(tripSchema.id, tripId));

    const trip = trips[0];

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    if (trip.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this trip',
      );
    }

    await db.delete(tripSchema).where(eq(tripSchema.id, tripId));

    return { message: 'Trip deleted successfully' };
  }

  async getTrip(userId: string, tripId: string) {
    const trips = await db
      .select()
      .from(tripSchema)
      .where(eq(tripSchema.id, tripId));

    const trip = trips[0];

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    if (trip.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view this trip',
      );
    }

    const places = await db
      .select()
      .from(placeSchema)
      .where(eq(placeSchema.tripId, tripId))
      .orderBy(placeSchema.dayNumber);

    return {
      trip,
      places,
    };
  }

  async updateTrip(userId: string, tripId: string, dto: UpdateTripDto) {
    const trips = await db
      .select()
      .from(tripSchema)
      .where(eq(tripSchema.id, tripId));

    const trip = trips[0];
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    if (trip.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this trip',
      );
    }

    if (
      dto.startDate &&
      dto.endDate &&
      new Date(dto.startDate) > new Date(dto.endDate)
    ) {
      throw new BadRequestException('Start date cannot be after end date');
    }

    const [updated] = await db
      .update(tripSchema)
      .set({
        title: dto.title ?? trip.title,
        description: dto.description ?? trip.description,
        startDate: dto.startDate ? new Date(dto.startDate) : trip.startDate,
        endDate: dto.endDate ? new Date(dto.endDate) : trip.endDate,
      })
      .where(eq(tripSchema.id, tripId))
      .returning();

    return updated;
  }
}
