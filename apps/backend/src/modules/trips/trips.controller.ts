import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { Request } from 'express';
import { TripsService } from '@/modules/trips/trips.service';
import { CreateTripDto } from '@/modules/trips/dto/create-trip.dto';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTrips(@Req() req: Request & { user: { id: string } }) {
    return this.tripsService.getAllTrips(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTrip(
    @Param('id') tripId: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.tripsService.getTrip(req.user.id, tripId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTrip(
    @Req() req: Request & { user: { id: string } },
    @Body() body: CreateTripDto,
  ) {
    return this.tripsService.createTrip(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTrip(
    @Param('id') tripId: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.tripsService.deleteTrip(req.user.id, tripId);
  }
}
