import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { Request } from 'express';
import { PlacesService } from '@/modules/places/places.service';
import { UpdatePlaceDto } from '@/modules/places/dto/update-place.dto';
import { CreatePlaceDto } from '@/modules/places/dto/create-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPlace(
    @Req() req: Request & { user: { id: string } },
    @Body() body: CreatePlaceDto,
  ) {
    return this.placesService.createPlace(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePlace(
    @Param('id') placeId: string,
    @Body() body: UpdatePlaceDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.placesService.updatePlace(req.user.id, placeId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePlace(
    @Param('id') tripId: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.placesService.deletePlace(req.user.id, tripId);
  }
}
