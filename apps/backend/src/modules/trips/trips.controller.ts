import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/modules/auth/jwt-auth.guard";
import { Request } from "express";
import {TripsService} from "@/modules/trips/trips.service";

@Controller("trips")
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTrips(@Req() req: Request & { user: { id: string } }) {
    return this.tripsService.getAllTrips(req.user.id);
  }
}
